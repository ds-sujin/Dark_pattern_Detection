import easyocr
import torch
import torch.nn.functional as F
from transformers import BertTokenizer
import joblib
import json
import os
from model.dual_classifier import DualClassifier

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# OCR 엔진
reader = easyocr.Reader(['en', 'ko'])

# Tokenizer & Model 로딩
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
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

def predict_with_probs(text, topk=3):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        cat_logits, pred_logits = model(**inputs)

    cat_index = int(torch.argmax(cat_logits, dim=1))
    pred_index = int(torch.argmax(pred_logits, dim=1))

    cat_probs = F.softmax(cat_logits, dim=1).cpu().numpy()[0]
    pred_probs = F.softmax(pred_logits, dim=1).cpu().numpy()[0]

    top_pred_indices = pred_probs.argsort()[::-1][:topk]

    return {
        "category": category_encoder.inverse_transform([cat_index])[0],
        "predicate": predicate_encoder.inverse_transform([pred_index])[0],
        "top_predicates": [
            {
                "label": predicate_encoder.inverse_transform([i])[0],
                "score": round(pred_probs[i], 4)
            }
            for i in top_pred_indices
        ]
    }

def process_image_and_predict(image_path):
    ocr_results = reader.readtext(image_path)
    output = []

    for (bbox, text, prob) in ocr_results:
        x_min = int(min(p[0] for p in bbox))
        y_min = int(min(p[1] for p in bbox))
        width = int(max(p[0] for p in bbox)) - x_min
        height = int(max(p[1] for p in bbox)) - y_min

        result = predict_with_probs(text)
        is_dark = 0 if result["category"] == "Not_Dark_Pattern" else 1

        output.append({
            "text": text,
            "confidence": float(prob),
            "bbox": json.dumps({
                "x": x_min, "y": y_min, "width": width, "height": height
            }),
            "is_darkpattern": is_dark,
            "pred_class_label": result["category"],
            "predicate": result["predicate"],
            "top1_predicate": f"{result['top_predicates'][0]['label']} ({result['top_predicates'][0]['score']})" if len(result['top_predicates']) > 0 else None,
            "top2_predicate": f"{result['top_predicates'][1]['label']} ({result['top_predicates'][1]['score']})" if len(result['top_predicates']) > 1 else None,
            "top3_predicate": f"{result['top_predicates'][2]['label']} ({result['top_predicates'][2]['score']})" if len(result['top_predicates']) > 2 else None,
            "category": result["category"],
            "type": result["category"] if is_dark else None,
            "laws": []
        })

    return output