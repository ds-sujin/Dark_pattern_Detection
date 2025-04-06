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
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

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
all_buttons = main_button_texts + popup_button_texts
btn_df = pd.DataFrame(all_buttons)
btn_df.to_csv("button_texts.csv", index=False, encoding='utf-8-sig')
print("✅ 통합 버튼 텍스트 저장 완료: button_texts.csv")

# -----------------------------------
# ✅ 4. 최종 결과 CSV (다크 패턴 변수)
# -----------------------------------
result = {
    "url": url,
    "CS_button_sentiment_score": None,
    "CS_loss_word_flag": int(any(b['contains_loss_word'] for b in all_buttons)),
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
    "FM_session_exists": None
}
df = pd.DataFrame([result])
df.to_csv("foodology_darkpatterns.csv", index=False, encoding='utf-8-sig')
print("✅ foodology_darkpatterns.csv 저장 완료")

driver.quit()