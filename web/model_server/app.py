from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from model.predictor import process_image_and_predict

load_dotenv()

app = Flask(__name__)

# MongoDB 연결
client = MongoClient(os.getenv("MONGODB_URL"))
db = client["web"]
predicate_col = db["predicate"]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    filename = data.get("filename")

    if not filename:
        return jsonify({"error": "filename 누락됨"}), 400

    # ✅ server/input_image에서 이미지 로드
    img_path = os.path.join("input_image", filename)  # ✅ 변경
    if not os.path.exists(img_path):
        return jsonify({"error": f"{img_path} 경로에 이미지가 존재하지 않습니다."}), 404

    try:
        prediction_results = process_image_and_predict(img_path)
        if prediction_results:
            predicate_col.insert_many(prediction_results)
        return jsonify({"message": "✅ 예측 및 저장 완료", "count": len(prediction_results)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)