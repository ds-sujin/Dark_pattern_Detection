import easyocr
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM, BertTokenizer
import joblib
import json
import os
import pandas as pd
from model.dual_classifier import DualClassifier

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# OCR 엔진 초기화
reader = easyocr.Reader(['en', 'ko'])

# 1단계 HuggingFace 모델 로드 (is_darkpattern 여부 판단)
dp_tokenizer = AutoTokenizer.from_pretrained("h4shk4t/darkpatternLLM-multiclass")
dp_model = AutoModelForSequenceClassification.from_pretrained("h4shk4t/darkpatternLLM-multiclass")
dp_model.to(device)
dp_model.eval()

class_map = {
    0: "scarcity",
    1: "misdirection",
    2: "Not_Dark_Pattern",
    3: "obstruction",
    4: "forced_action",
    5: "sneaking",
    6: "social_proof",
    7: "urgency"
}

# 번역 모델 로드 (영->한)
trans_model_name = "Helsinki-NLP/opus-mt-ko-en"
trans_tokenizer = AutoTokenizer.from_pretrained(trans_model_name)
trans_model = AutoModelForSeq2SeqLM.from_pretrained(trans_model_name).to(device)

# 2단계 BERT 모델 로드 (category, predicate)
bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model_path = "model/dual_classifier_model.pth"
category_encoder = joblib.load("model/label_encoders/category_encoder.pkl")
predicate_encoder = joblib.load("model/label_encoders/predicate_encoder.pkl")

model = DualClassifier(
    num_category=len(category_encoder.classes_),
    num_predicate=len(predicate_encoder.classes_)
)
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

# 예측 함수 (두 단계 분기 + 번역 포함)
def process_image_and_predict(image_path):
    law_path = "model/predicate_type_law.csv"
    if os.path.exists(law_path):
        laws_df = pd.read_csv(law_path)
        reduced_law = laws_df[['type', 'laws']].drop_duplicates().reset_index(drop=True)
    else:
        reduced_law = pd.DataFrame(columns=['type', 'laws'])

    ocr_results = reader.readtext(image_path)
    output = []

    for (bbox, text, prob) in ocr_results:
        x_min = int(min(p[0] for p in bbox))
        y_min = int(min(p[1] for p in bbox))
        width = int(max(p[0] for p in bbox)) - x_min
        height = int(max(p[1] for p in bbox)) - y_min

        # 번역: 영어 → 한국어
        input_text = text.strip()
        try:
            trans_inputs = trans_tokenizer.encode(input_text, return_tensors="pt", truncation=True).to(device)
            translated = trans_model.generate(trans_inputs, max_length=100)
            translated_text = trans_tokenizer.decode(translated[0], skip_special_tokens=True)
        except Exception:
            translated_text = input_text  # 번역 실패 시 원문 유지

        # ✅ 예측 기준을 번역된 텍스트로 변경
        # 1단계: 다크패턴 여부 판단
        dp_inputs = dp_tokenizer(translated_text, return_tensors="pt", truncation=True, padding=True).to(device)
        with torch.no_grad():
            logits = dp_model(**dp_inputs).logits
            probs = F.softmax(logits, dim=1)[0]
            pred_class = torch.argmax(probs).item()
            pred_label = class_map[pred_class]

        is_dark = 0 if pred_label == "Not_Dark_Pattern" else 1
        category, predicate, top_preds = None, None, []

        # 2단계: 다크패턴일 경우 category/predicate 예측
        if is_dark:
            bert_inputs = bert_tokenizer(translated_text, return_tensors="pt", truncation=True, padding=True).to(device)
            with torch.no_grad():
                cat_logits, pred_logits = model(**bert_inputs)
                cat_idx = torch.argmax(cat_logits, dim=1).item()
                pred_idx = torch.argmax(pred_logits, dim=1).item()

                category = category_encoder.inverse_transform([cat_idx])[0]
                predicate = predicate_encoder.inverse_transform([pred_idx])[0]

                pred_probs = F.softmax(pred_logits, dim=1).cpu().numpy()[0]
                top_indices = pred_probs.argsort()[::-1][:3]
                top_preds = [
                    f"{predicate_encoder.inverse_transform([i])[0]} ({round(pred_probs[i], 4)})"
                    for i in top_indices
                ]

        # 법률 정보 연결
        law_list = []
        if category:
            law_row = reduced_law[reduced_law["type"] == category]
            if not law_row.empty:
                try:
                    law_list = json.loads(law_row.iloc[0]["laws"])
                except Exception as e:
                    print(f"[WARNING] JSON parsing error in laws: {e}")

        output.append({
            "text": text,
            "translated": translated_text,
            "confidence": float(prob),
            "bbox": json.dumps({"x": x_min, "y": y_min, "width": width, "height": height}),
            "is_darkpattern": is_dark,
            "predicate": predicate,
            "top1_predicate": top_preds[0] if len(top_preds) > 0 else None,
            "top2_predicate": top_preds[1] if len(top_preds) > 1 else None,
            "top3_predicate": top_preds[2] if len(top_preds) > 2 else None,
            "category": category,
            "type": category,
            "laws": law_list
        })

    return output