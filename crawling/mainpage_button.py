from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

# 드라이버 옵션 설정
options = webdriver.ChromeOptions()
options.add_argument('--headless=new')  # ✅ 최신 버전용 headless 모드
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--disable-gpu')  # ✅ GPU 사용 방지 (mac에서 유용)
options.add_argument('--disable-software-rasterizer')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = "https://www.food-ology.co.kr/"
driver.get(url)
time.sleep(3)

# 손실 표현 단어
loss_words = ["포기", "상실", "위험"]

# -----------------------------------
# ✅ 1. 메인 페이지 버튼 수집
# -----------------------------------
main_buttons = driver.find_elements(By.XPATH, """
    //button | 
    //a[@role='button'] | 
    //div[@role='button'] | 
    //a[contains(@class, 'btn')] | 
    //div[contains(@class, 'btn')] |
    //a[normalize-space(text()) != '']
""")

main_button_texts = []
for btn in main_buttons:
    text = btn.text.strip()
    if text:
        contains_loss = int(any(word in text for word in loss_words))
        main_button_texts.append({
            "text": text,
            "contains_loss_word": contains_loss,
            "source": "main"
        })

# 제품 링크 수집 전, 페이지 끝까지 스크롤 내리기 (3~5회 반복)
for _ in range(5):  # 필요시 횟수 늘리기
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

# 제품 링크 수집
product_links = driver.find_elements(By.CSS_SELECTOR, "a[href*='/product/detail.html']")
product_urls = []
visited_urls = set()

for link in product_links:
    href = link.get_attribute("href")
    if href and href not in visited_urls:
        product_urls.append(href)
        visited_urls.add(href)

print(f"🔗 수집된 제품 링크 개수: {len(product_urls)}")

# -----------------------------------
# ✅ 1-2. 제품 상세 페이지 이동 및 버튼 수집
# -----------------------------------
detail_button_texts = []

results = []

try:
    for i, product_url in enumerate(product_urls[:10]):  # 최대 10개 제품 페이지 방문
        print(f"📦 ({i+1}) 상세 페이지 URL:", product_url)

        # product_id 추출
        if "product_no=" in product_url:
            product_id = product_url.split("product_no=")[-1]
        else:
            product_id = f"unknown{i+1}"

        driver.get(product_url)
        time.sleep(2)

        # 상세 페이지 버튼 수집
        detail_buttons = driver.find_elements(By.XPATH, """
            //button | 
            //a[@role='button'] | 
            //div[@role='button'] | 
            //a[contains(@class, 'btn')] | 
            //div[contains(@class, 'btn')] |
            //a[normalize-space(text()) != '']
        """)

        for btn in detail_buttons:
            text = btn.text.strip()
            if text:
                contains_loss = int(any(word in text for word in loss_words))
                detail_button_texts.append({
                    "text": text,
                    "contains_loss_word": contains_loss,
                    "source": f"product{product_id}"})

        # 다크 패턴 결과 저장
        results.append({
            "url": product_url,
            "source": f"product{product_id}",
            "CS_button_sentiment_score": None,
            "CS_loss_word_flag": int(any(b['contains_loss_word'] for b in detail_button_texts if b['source'] == f"product{product_id}")),
            "RM_signup_clicks": None,
            "RM_cancel_clicks": None,
            "RM_settings_depth": None,
            "FA_required_consent_count": None,
            "FA_optout_available": None,
            "PR_checkbox_default": None,
            "PR_option_text_readability": None,
            "DA_button_visual_consistency": None,
            "DA_text_similarity_score": None,
            "FM_warning_message_count": None,
            "FM_threatening_language_flag": None,
            "FM_session_exists": None,
        })

        driver.back()
        time.sleep(2)
except Exception as e:
    print("상세 페이지 버튼 수집 실패:", e)

# -----------------------------------
# ✅ 2. 팝업 대기 및 팝업 버튼 수집
# -----------------------------------
popup_button_texts = []
try:
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '혜택')]"))
    )
    popup_buttons = driver.find_elements(By.XPATH, """
        //div[contains(@class, 'popup')]//button |
        //div[contains(@class, 'popup')]//*[contains(@class, 'btn')] |
        //div[contains(@class, 'popup')]//*[contains(text(), '포기')] |
        //div[contains(@class, 'popup')]//a[contains(@class, 'btn')] |
        //div[contains(@class, 'popup')]//a[normalize-space(text()) != '']
    """)

    for btn in popup_buttons:
        text = btn.text.strip()
        if text:
            contains_loss = int(any(word in text for word in loss_words))
            popup_button_texts.append({
                "text": text,
                "contains_loss_word": contains_loss,
                "source": "popup"
            })
except:
    print("팝업 버튼 탐지 실패 또는 제한 시간 내 미노출")

# -----------------------------------
# ✅ 3. 통합 저장
# -----------------------------------
all_buttons = main_button_texts + detail_button_texts + popup_button_texts
btn_df = pd.DataFrame(all_buttons)
btn_df.to_csv("main_button_texts.csv", index=False, encoding='utf-8-sig')
print("✅ 통합 버튼 텍스트 저장 완료: main_button_texts.csv")

# -----------------------------------
# ✅ 4. 최종 결과 CSV (다크 패턴 변수)
# 메인 페이지 result 추가
main_result = {
    "url": url,
    "source": "main",
    "CS_button_sentiment_score": None,
    "CS_loss_word_flag": int(any(b['contains_loss_word'] for b in main_button_texts)),
    "RM_signup_clicks": None,
    "RM_cancel_clicks": None,
    "RM_settings_depth": None,
    "FA_required_consent_count": None,
    "FA_optout_available": None,
    "PR_checkbox_default": None,
    "PR_option_text_readability": None,
    "DA_button_visual_consistency": None,
    "DA_text_similarity_score": None,
    "FM_warning_message_count": None,
    "FM_threatening_language_flag": None,
    "FM_session_exists": None,
}
results.append(main_result)

# 저장
df = pd.DataFrame(results)
df.to_csv("foodology_darkpatterns.csv", index=False, encoding='utf-8-sig')
print("✅ foodology_darkpatterns.csv 저장 완료 (다중 페이지 포함)")

driver.quit()