from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import re

app = Flask(__name__)
CORS(app)

# MongoDB 연결
client = MongoClient("mongodb://localhost:27017")
db = client["user_db"]
collection = db["users"]

# 이메일 및 비밀번호 유효성 검사 함수
def is_valid_email(user_id):
    return "@" in user_id and user_id.endswith(".com")

def is_valid_password(password):
    if len(password) < 8:
        return False
    return bool(re.search("[A-Za-z]", password)) and bool(re.search("[0-9]", password))

# ID 중복 확인 API
@app.route("/check-id", methods=["POST"])
def check_id():
    user_id = request.json["id"]
    if collection.find_one({"id": user_id}):
        return jsonify({"available": False, "message": "중복된 아이디입니다. 다시 입력해주세요."})
    return jsonify({"available": True, "message": "사용 가능한 아이디입니다."})

# 회원가입 API
@app.route("/signup", methods=["POST"])
def signup():
    name = request.json["name"]
    user_id = request.json["id"]
    password = request.json["password"]

    if not is_valid_email(user_id):
        return jsonify({"success": False, "message": "유효한 이메일 형식이 아닙니다. '@'와 '.com'을 포함해주세요."})

    if not is_valid_password(password):
        return jsonify({"success": False, "message": "비밀번호는 영문과 숫자를 포함한 8자 이상이어야 합니다."})

    if collection.find_one({"id": user_id}):
        return jsonify({"success": False, "message": "이미 존재하는 아이디입니다."})

    collection.insert_one({
        "name": name,
        "id": user_id,
        "password": password
    })

    return jsonify({"success": True, "message": f"{name}님, 가입이 완료되었습니다."})

# 로그인 API
@app.route("/login", methods=["POST"])
def login():
    user_id = request.json["id"]
    password = request.json["password"]

    if not is_valid_email(user_id):
        return jsonify({"success": False, "message": "이메일 형식이 올바르지 않습니다."})

    user = collection.find_one({"id": user_id})
    if user:
        if user["password"] == password:
            return jsonify({"success": True, "message": f"{user['name']}님 환영합니다!"})
        else:
            return jsonify({"success": False, "message": "비밀번호가 틀렸습니다. 다시 입력해주세요."})
    return jsonify({"success": False, "message": "해당 아이디로 가입된 이력이 없습니다."})

# 앱 실행
if __name__ == "__main__":
    print("Flask 서버 실행 준비 완료")
    app.run(debug=True)
