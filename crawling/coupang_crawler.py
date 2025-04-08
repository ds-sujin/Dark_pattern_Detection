from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import pandas as pd
import time
from webdriver_manager.chrome import ChromeDriverManager

# 크롬 옵션 설정
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # 브라우저 창 없이 실행
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")

# 웹드라이버 실행
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# 쿠팡 카테고리 URL (예: 식품 카테고리)
url = 'https://www.coupang.com/np/categories/194276'
driver.get(url)
time.sleep(3)

# 페이지 아래로 스크롤하여 콘텐츠 로딩 유도
last_height = driver.execute_script("return document.body.scrollHeight")
for i in range(3):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# HTML 파싱
soup = BeautifulSoup(driver.page_source, 'html.parser')

# 버튼 텍스트 수집
buttons = [btn.get_text(strip=True) for btn in soup.find_all('button') if btn.get_text(strip=True)]

# 일반 텍스트 수집
texts = [div.get_text(strip=True) for div in soup.find_all('div') if div.get_text(strip=True)]

# 광고 문구 수집
ads = [span.get_text(strip=True) for span in soup.find_all('span') if '광고' in span.get_text()]

# 결과 각각 저장
df_buttons = pd.DataFrame({'buttons': buttons})
df_buttons.to_csv('coupang_buttons.csv', index=False, encoding='utf-8-sig')

df_texts = pd.DataFrame({'texts': texts})
df_texts.to_csv('coupang_texts.csv', index=False, encoding='utf-8-sig')

df_ads = pd.DataFrame({'ads': ads})
df_ads.to_csv('coupang_ads.csv', index=False, encoding='utf-8-sig')

driver.quit()
print("크롤링이 완료되었습니다. 결과는 CSV 파일로 저장되었습니다.")
