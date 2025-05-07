from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time

links = [
    "https://www.deceptive.design/laws/arizona-consumer-fraud-act-a-r-s-ss-44-1521",
    "https://www.deceptive.design/laws/section-24-6-of-the-austria-data-protection-act-dsg",
    "https://www.deceptive.design/laws/can-spam-act---section-5-a-1-15-u-s-c-ss-7704-a-1",
    "https://www.deceptive.design/laws/california-consumers-legal-remedies-act-cal-civ-code-ss-1750",
    "https://www.deceptive.design/laws/california-s-false-advertising-law-cal-bus-prof-code-ss-17500",
    "https://www.deceptive.design/laws/children-s-online-privacy-protection-act-rule",
    "https://www.deceptive.design/laws/article-130-codice-privacy",
    "https://www.deceptive.design/laws/consumer-contracts-information-cancellation-and-additional-charges-regulations-2013",
    "https://www.deceptive.design/laws/consumer-financial-protection-act",
    "https://www.deceptive.design/laws/consumer-fraud-act-new-jersey-stat-ann-ss-56-8-2",
    "https://www.deceptive.design/laws/consumer-protection-cooperation-cpc-regulation-2006-2004-ec",
    "https://www.deceptive.design/laws/consumer-protection-from-unfair-trading-regulations-2008",
    "https://www.deceptive.design/laws/consumer-rights-act-2015",
    "https://www.deceptive.design/laws/article-2-h-directive-95-46",
    "https://www.deceptive.design/laws/article-6-directive-95-46",
    "https://www.deceptive.design/laws/article-7-directive-95-46",
    "https://www.deceptive.design/laws/district-s-consumer-protection-procedures-act-ss-28-3904",
    "https://www.deceptive.design/laws/section-6-3-3a-of-the-dutch-civil-code-unfair-commercial-practices",
    "https://www.deceptive.design/laws/dutch-policy-rules-administrative-fines-2019",
    "https://www.deceptive.design/laws/electronic-commerce-ec-directive-regulations-2002",
    "https://www.deceptive.design/laws/electronic-fund-transfer-act-efta",
    "https://www.deceptive.design/laws/fair-credit-reporting-act---15-u-s-c-ssss1681-1681",
    "https://www.deceptive.design/laws/article-8-of-the-federal-constitution-austria",
    "https://www.deceptive.design/laws/section-5-a-of-the-ftc-act-15-u-s-c-ss-45-a",
    "https://www.deceptive.design/laws/french-data-protection-act-article-82",
    "https://www.deceptive.design/laws/gdpr-article-3",
    "https://www.deceptive.design/laws/gdpr-article-4-11",
    "https://www.deceptive.design/laws/gdpr-article-4-16",
    "https://www.deceptive.design/laws/gdpr-article-5",
    "https://www.deceptive.design/laws/gdpr-article-6",
    "https://www.deceptive.design/laws/gdpr-article-7",
    "https://www.deceptive.design/laws/gdpr-article-8",
    "https://www.deceptive.design/laws/gdpr-article-9",
    "https://www.deceptive.design/laws/gdpr-article-12",
    "https://www.deceptive.design/laws/gdpr-article-13",
    "https://www.deceptive.design/laws/gdpr-article-14",
    "https://www.deceptive.design/laws/gdpr-article-15",
    "https://www.deceptive.design/laws/gdpr-article-17",
    "https://www.deceptive.design/laws/gdpr-article-21",
    "https://www.deceptive.design/laws/gdpr-article-24",
    "https://www.deceptive.design/laws/gdpr-article-25",
    "https://www.deceptive.design/laws/gdpr-article-28",
    "https://www.deceptive.design/laws/gdpr-article-32",
    "https://www.deceptive.design/laws/gdpr-article-33",
    "https://www.deceptive.design/laws/gdpr-article-37",
    "https://www.deceptive.design/laws/gdpr-article-38",
    "https://www.deceptive.design/laws/gdpr-article-39",
    "https://www.deceptive.design/laws/gdpr-article-42",
    "https://www.deceptive.design/laws/gdpr-article-43",
    "https://www.deceptive.design/laws/gdpr-article-57",
    "https://www.deceptive.design/laws/gdpr-article-58",
    "https://www.deceptive.design/laws/gdpr-article-83",
    "https://www.deceptive.design/laws/gdpr-recital-32",
    "https://www.deceptive.design/laws/german-competition-act---section-19a-2",
    "https://www.deceptive.design/laws/section-501-of-the-gramm-leach-bliley-act-act-15-u-s-c-ss-6801",
    "https://www.deceptive.design/laws/section-502-of-the-gramm-leach-bliley-act-act-15-u-s-c-ss-6802",
    "https://www.deceptive.design/laws/section-503-of-the-gramm-leach-bliley-act-act-15-u-s-c-ss-6803",
    "https://www.deceptive.design/laws/article-20-of-the-italian-consumer-code",
    "https://www.deceptive.design/laws/article-21-of-the-italian-consumer-code",
    "https://www.deceptive.design/laws/article-22-of-the-italian-consumer-code",
    "https://www.deceptive.design/laws/article-24-of-the-italian-consumer-code",
    "https://www.deceptive.design/laws/article-25-of-the-italian-consumer-code",
    "https://www.deceptive.design/laws/marketing-control-act---section-6-8-and-9",
    "https://www.deceptive.design/laws/new-york-consumer-fraud-statute-n-y-gen-bus-law-ss-349",
    "https://www.deceptive.design/laws/north-carolina-automatic-renewal-statute-n-c-g-s-section-75-41-a",
    "https://www.deceptive.design/laws/privacy-rule-16-c-f-r-part-313-recodified-at-12-c-f-r-ss-1016",
    "https://www.deceptive.design/laws/regulation-2-1-of-the-privacy-and-electronic-communications-ec-directive-regulations-2003",
    "https://www.deceptive.design/laws/privacy-and-electronic-communications-ec-directive-regulation-2003-regulation-21",
    "https://www.deceptive.design/laws/regulation-22-of-the-privacy-and-electronic-communications-ec-directive-regulations-2003",
    "https://www.deceptive.design/laws/section-4-of-rosca-15-u-s-c-ss-8401",
    "https://www.deceptive.design/laws/section-4-of-rosca-15-u-s-c-ss-8402",
    "https://www.deceptive.design/laws/section-4-of-rosca-15-u-s-c-ss-8403",
    "https://www.deceptive.design/laws/section-4-of-rosca-15-u-s-c-ss-8404",
    "https://www.deceptive.design/laws/section-4-of-rosca-15-u-s-c-ss-8405",
    "https://www.deceptive.design/laws/article-32-law-no-677-2001-of-the-romanian-data-protection-act",
    "https://www.deceptive.design/laws/article-11-of-the-spanish-data-protection-law-lopdgdd",
    "https://www.deceptive.design/laws/article-6-of-the-spanish-data-protection-law-lopdgdd",
    "https://www.deceptive.design/laws/article-21-of-the-spanish-law-on-information-society-services",
    "https://www.deceptive.design/laws/article-22-of-the-spanish-law-on-information-society-services",
    "https://www.deceptive.design/laws/uk-code-of-non-broadcast-advertising-sales-promotion-and-direct-marketing",
    "https://www.deceptive.design/laws/article-5-of-the-unfair-commercial-practices-directive",
    "https://www.deceptive.design/laws/article-6-of-the-unfair-commercial-practices-directive",
    "https://www.deceptive.design/laws/article-7-of-the-unfair-commercial-practices-directive",
    "https://www.deceptive.design/laws/unfair-competition-law-cal-bus-prof-code-ss-17200",
    "https://www.deceptive.design/laws/unfair-terms-in-consumer-contracts-regulations-1999",
    "https://www.deceptive.design/laws/washington-consumer-protection-act---wash-rev-code-ssss-19-86-010",
    "https://www.deceptive.design/laws/eprivacy-directive-article-5-3"
]

# 셀레니움 옵션 설정
options = Options()
options.add_argument("--headless")                  # 브라우저 창 없이 실행
options.add_argument("--no-sandbox")                # 샌드박스 모드 비활성화
options.add_argument("--disable-dev-shm-usage")     # 메모리 문제 방지
#options.add_argument("--user-data-dir=/tmp/unique_profile_123")  # 세션 중복 방지

# 웹드라이버 실행
driver = webdriver.Chrome(options=options)


all_data = []

# 하나씩 링크 접근
for i, link in enumerate(links):
    try:
        driver.get(link)
        time.sleep(2)  # 충분한 대기

        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # 제목
        title_elem = soup.select_one("body > div > div:nth-child(4) > header > div > div > div > div > div.margin-bottom.margin-small > h1")
        title = title_elem.get_text(strip=True) if title_elem else "제목 없음"

        # Definition과 Excerpt (동일한 위치에서 파싱)
        def_excerpt_elems = soup.select("#w-node-_7c05c3c3-e242-a81d-fb36-85bc2ce1d55f-f592b3d3 > p")
        definition = def_excerpt_elems[0].get_text(strip=True) if len(def_excerpt_elems) > 0 else None
        excerpt = def_excerpt_elems[1].get_text(strip=True) if len(def_excerpt_elems) > 1 else None

        # Related Cases
        case_names = soup.select("#w-node-_5c134200-77a6-fb0a-4536-d34c29e2af57-859c10e7 > a > div")
        case_descriptions = soup.select("#w-node-_5c134200-77a6-fb0a-4536-d34c29e2af5d-859c10e7 > p")
        related_cases = []
        for name, desc in zip(case_names, case_descriptions):
            related_cases.append({
                "name": name.get_text(strip=True),
                "description": desc.get_text(strip=True)
            })

        # Related deceptive patterns
        pattern_names = soup.select("#w-node-_0145fe92-af89-7789-8c71-34d7cbb08b5b-859c10e7")
        pattern_descriptions = soup.select("#w-node-_0145fe92-af89-7789-8c71-34d7cbb08b5e-859c10e7 > div")
        related_patterns = []
        for name, desc in zip(pattern_names, pattern_descriptions):
            related_patterns.append({
                "name": name.get_text(strip=True),
                "description": desc.get_text(strip=True)
            })

        # 결과 저장
        all_data.append({
            "title": title,
            "url": link,
            "definition": definition,
            "excerpt": excerpt,
            "related_cases": related_cases,
            "related_deceptive_patterns": related_patterns
        })

        print(f"[{i+1}] {title} → {link}")

    except Exception as e:
        print(f"❌ 오류 발생 ({i+1}): {link}")
        print("오류 내용:", str(e))
        continue

# JSON 저장
with open("laws_detailed.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

driver.quit()
print("🎉 전체 크롤링 완료! laws_detailed.json 저장됨.")