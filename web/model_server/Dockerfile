# 베이스 이미지 (PyTorch + Python + pip 설치됨)
FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# 로컬 파일 복사
COPY . .

# 의존성 설치
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# 포트 개방
EXPOSE 5005

# Flask 실행
CMD ["python", "app.py"]