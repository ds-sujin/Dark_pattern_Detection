from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "db.json")

def load_db():
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/check-id", methods=["POST"])
def check_id():
    username = request.json["username"]
    db = load_db()
    for user in db["users"]:
        if user["username"] == username:
            return jsonify({"available": False, "message": " 중복된 아이디입니다. 다시 입력해주세요."})
    return jsonify({"available": True, "message": " 사용 가능한 아이디입니다."})

@app.route("/signup", methods=["POST"])
def signup():
    name = request.json["name"]
    username = request.json["username"]
    password = request.json["password"]

    db = load_db()
    for user in db["users"]:
        if user["username"] == username:
            return jsonify({"success": False, "message": " 이미 존재하는 아이디입니다."})

    db["users"].append({
        "name": name,
        "username": username,
        "password": password
    })
    save_db(db)
    return jsonify({"success": True, "message": f" {name}님, 가입이 완료되었습니다!"})

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    db = load_db()

    for user in db["users"]:
        if user["username"] == username:
            if user["password"] == password:
                return jsonify({"success": True, "message": f" {user['name']}님 환영합니다!"})
            else:
                return jsonify({"success": False, "message": " 비밀번호가 틀렸습니다. 다시 입력해주세요."})
    return jsonify({"success": False, "message": " 해당 아이디로 가입된 이력이 없습니다."})

if __name__ == "__main__":
    if not os.path.exists(DB_PATH):
        save_db({"users": []})
    print("Flask 서버 실행 준비 완료")

    app.run(debug=True)
