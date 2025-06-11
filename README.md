# 졸업 프로젝트
<b>주제</b>

Neuro Symbolic AI기반 Dark Pattern Detection 서비스

<b>팀 구성</b>

- 정수진 : 사이트 크롤링 / 모델 서빙
- 박현우 : BERT 모델링
- 박소영 : OpenAI, 모델링
- 오민진 : 디자인 / 프론트 개발
- 박제인 : 백엔드 개발
- 정유빈 : 뉴스 기사 크롤링 / 백엔드 개발

<b>사용한 툴</b>

![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![mongoDB](	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


<b>Github 폴더 설명</b>
```bash
📁 web/
├── client/           # Vite 기반 React UI (TailwindCSS 포함)
├── server/           # Flask 기반 백엔드 및 MongoDB 연동
└── README.md         # 전체 웹 시스템 설명 문서

📁 Modeling/
└── DeepProbLog/      # 다크 패턴 탐지를 위한 논리 기반 추론 모델용 데이터(JSON)

📁 OCR/
├── OCR.ipynb         # OCR 실험용 Jupyter Notebook
└── btn_ars_.png      # OCR 대상 이미지 (UI 버튼 캡처 등)

📁 crawling/
├── laws.py           # 다크 패턴 관련 법률 정보 크롤링
└── RM_click.py       # Roach Motel 유형 클릭 경로 요소 크롤링
```

# 사이드 프로젝트
SW / HW 재료비 지원을 위한 사이드 프로젝트

조건 : 25 ICROS 학술대회 참가

제출 분야 : HRI(인간∙로봇 상호작용)

<b>주제</b>

고령자 키오스크 환경의 HRI 기반 다크 패턴 대응 시스템 제안: Neuro-Symbolic 실시간 판단 구조

<b>사용성 평가</b>

대상 : 60세 이상의 고령자
- 월계문화복지센터 총 20명 모집 후 진행 완료

<b>사용한 툴</b>

![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![mongoDB](	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

<b>Github 폴더 설명</b>
```bash
📁 ABtest/
├── raw/                 # 사용성 평가 전·후 설문 응답, 원본 클릭로그 데이터
├── editdata/            # 시나리오별 전처리된 클릭로그 및 설문 결과
├── analysis.ipynb       # 실험 결과 분석용 Jupyter Notebook
└── clicklogs_*.ipynb    # 시나리오 분리 및 분석 코드

📁 kiosk/
├── client/              # React 기반 키오스크 UI 구현
├── server/              # Node.js 기반 백엔드 (API, MongoDB 연동 등)
└── README.md            # 키오스크 시스템 설명서

📁 kiosk_90/
└── ...                  # 평가 대상 모니터 환경에 맞춰 비율 조정된 키오스크 UI 버전
```

