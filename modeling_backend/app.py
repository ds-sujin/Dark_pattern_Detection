import os
import re
import torch
import joblib
from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import BertTokenizer

# ✅ 1. .env 로드 및 Mongo 연결
load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("TARGET_DB")]
collection = db[os.getenv("TARGET_COLLECTION")]

# ✅ 2. 최신 문서 하나 가져오기
latest_doc = collection.find_one(sort=[("uploaded_at", -1)])
if not latest_doc or "text" not in latest_doc:
    raise ValueError("MongoDB에서 OCR 텍스트를 찾을 수 없습니다.")

raw_text = latest_doc["text"]

# ✅ 3. 전처리 함수 정의
def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

cleaned_text = clean_text(raw_text)

# ✅ 4. 모델과 라벨 인코더 로드
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = torch.load("bert_model/model.pt", map_location=torch.device('cpu'))
model.eval()
label_encoder = joblib.load("bert_model/label_encoder.pkl")

# ✅ 5. 예측 함수
def predict_predicate(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        logits = model(**inputs)
        predicted = torch.argmax(logits, dim=1).item()
    return label_encoder.inverse_transform([predicted])[0]

# ✅ 6. 예측 실행
predicate_result = predict_predicate(cleaned_text)
print(f"✅ 예측된 Predicate: {predicate_result}")

# ✅ 7. .pl 파일로 저장
pl_path = "output/user_predicates.pl"
os.makedirs("output", exist_ok=True)

with open(pl_path, "w") as f:
    f.write(predicate_result + ".\n")

print(f"✅ .pl 파일로 저장 완료: {pl_path}")