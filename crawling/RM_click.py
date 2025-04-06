from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

options = webdriver.ChromeOptions()
#options.add_argument('--headless=new')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--disable-gpu')
options.add_argument('--disable-software-rasterizer')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = "https://www.food-ology.co.kr/"
click_count = 0
step_log = []

visited_urls = set()
current_url = url
driver.get(current_url)
visited_urls.add(current_url)

while True:
    # 다양한 회원가입 관련 요소 탐색
    signup_elements = driver.find_elements(By.XPATH, """
        //a[contains(text(), '회원가입')] | 
        //button[contains(text(), '회원가입')] | 
        //div[contains(text(), '회원가입')] | 
        //span[contains(text(), '회원가입')] |
        //*[@onclick and contains(., '회원가입')]
    """)
    
    if signup_elements:
        click_count += 1
        step_log.append((f"회원가입 요소 탐지 및 클릭 시도 (URL: {driver.current_url})", click_count))
        try:
            current_url = driver.current_url
            signup_elements[0].click()
            time.sleep(2)
            new_url = driver.current_url

            # 같은 URL이라도 새 동작이면 탐색 계속
            if new_url in visited_urls:
                step_log.append((f"🔁 이미 방문한 URL 재진입 시도됨 (URL: {new_url})", click_count))
                break
            visited_urls.add(new_url)
        except Exception as e:
            step_log.append((f"❌ 클릭 실패: {str(e)}", click_count))
            break
    else:
        step_log.append((f"❌ 회원가입 관련 요소 없음 (URL: {driver.current_url})", click_count))
        break

# CSV 저장
result_df = pd.DataFrame(step_log, columns=["단계", "현재 클릭 수"])
result_df.to_csv("signup_click_steps.csv", index=False, encoding="utf-8-sig")
print("✅ 회원가입 단계 및 클릭 수 저장 완료: signup_click_steps.csv")

# -------------------------------------------------------
# ✅ 다음 단계: 해지 클릭 수 측정 (로그인 후 마이페이지 > 해지 버튼까지)
# -------------------------------------------------------

# 로그인 진행 (공용 계정 사용)
login_url = "https://www.food-ology.co.kr/member/login.html"
driver.get(login_url)
time.sleep(2)

step_log.append(("🔐 로그인 페이지 접속", click_count))

try:
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "member_id"))).send_keys("darkpattern404")
    time.sleep(1)
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "member_passwd"))).send_keys("pattern404!")
    time.sleep(1)

    # 로그인 버튼 찾기
    login_btn = None
    try:
        # 실제 사이트의 로그인 버튼은 <a> 태그이므로 해당 조건 추가
        login_btn = driver.find_element(By.XPATH, "//a[contains(@onclick, 'MemberAction.login')]")
    except:
        try:
            login_btn = driver.find_element(By.XPATH, "//button[contains(text(), '로그인')]")
        except:
            try:
                login_btn = driver.find_element(By.CSS_SELECTOR, "input[type='submit']")
            except:
                step_log.append(("❌ 로그인 버튼 찾기 실패", click_count))

    if login_btn:
        login_btn.click()
        click_count += 1
        step_log.append(("✅ 로그인 클릭", click_count))
        time.sleep(3)

        # 로그인 성공 여부 확인
        if "logout" in driver.page_source.lower() or "마이페이지" in driver.page_source:
            step_log.append(("✅ 로그인 성공 확인됨", click_count))
        else:
            step_log.append(("❌ 로그인 이후 로그인 상태 미확인", click_count))

        # 로그인 실패 메시지 출력
        error_message = driver.find_elements(By.CLASS_NAME, "message")
        for msg in error_message:
            step_log.append((f"⚠️ 로그인 에러 메시지: {msg.text}", click_count))

except Exception as e:
    step_log.append((f"❌ 로그인 또는 마이페이지 이동 실패: {str(e)}", click_count))

# 해지 버튼 경로 추적
keywords = ["마이페이지", "구독", "정기", "해지", "취소", "회원탈퇴", "결제", "내 정보"]
visited_urls = set()
visited_urls.add(driver.current_url)

while True:
    driver.refresh()
    time.sleep(2)
    found = False
    for word in keywords:
        candidates = driver.find_elements(By.XPATH, f"//*[contains(text(), '{word}')]")
        for c in candidates:
            try:
                href = c.get_attribute("href")
                if href and href.startswith("http") and href not in visited_urls:
                    driver.get(href)
                    time.sleep(2)
                    click_count += 1
                    visited_urls.add(href)
                    step_log.append((f"🔗 '{word}' 관련 페이지 이동 (URL: {href})", click_count))
                    # 추가: 탈퇴 버튼 발견 시 종료
                    withdraw_buttons = driver.find_elements(By.XPATH, "//*[contains(text(), '탈퇴')]")
                    if withdraw_buttons:
                        click_count += 1
                        step_log.append(("🛑 '탈퇴' 버튼 발견됨 - 클릭하지 않고 종료", click_count))
                        result_df = pd.DataFrame(step_log, columns=["단계", "현재 클릭 수"])
                        result_df.to_csv("signup_and_cancel_click_steps.csv", index=False, encoding="utf-8-sig")
                        print("✅ 탈퇴 버튼까지 탐색 완료 및 저장")
                        driver.quit()
                        exit()
                    found = True
                    break
                elif c.tag_name.lower() in ['a', 'button', 'div', 'span']:
                    c.click()
                    time.sleep(2)
                    new_url = driver.current_url
                    if new_url not in visited_urls:
                        click_count += 1
                        visited_urls.add(new_url)
                        step_log.append((f"▶️ '{word}' 클릭 이동 (URL: {new_url})", click_count))
                        # 추가: 탈퇴 버튼 발견 시 종료
                        withdraw_buttons = driver.find_elements(By.XPATH, "//*[contains(text(), '탈퇴')]")
                        if withdraw_buttons:
                            click_count += 1
                            step_log.append(("🛑 '탈퇴' 버튼 발견됨 - 클릭하지 않고 종료", click_count))
                            result_df = pd.DataFrame(step_log, columns=["단계", "현재 클릭 수"])
                            result_df.to_csv("signup_and_cancel_click_steps.csv", index=False, encoding="utf-8-sig")
                            print("✅ 탈퇴 버튼까지 탐색 완료 및 저장")
                            driver.quit()
                            exit()
                        found = True
                        break
            except Exception as e:
                step_log.append((f"❌ '{word}' 클릭 실패: {str(e)}", click_count))
        if found:
            # 페이지가 바뀌었으므로 새 요소를 다시 탐색하기 위해 루프를 재시작
            break  # 기존 루프 한 사이클만 빠져나감
    if not found:
        step_log.append(("🛑 더 이상 이동할 수 있는 해지 관련 요소 없음", click_count))
        break

# 추가: '마이페이지' 관련 요소에서 프로필 링크 클릭
try:
    profile_link = driver.find_element(By.XPATH, "//li[contains(@class, 'profile')]//a[@href='/member/modify.html']")
    profile_link.click()
    click_count += 1
    step_log.append(("🔗 프로필 수정 페이지 이동 (URL: /member/modify.html)", click_count))
except Exception as e:
    step_log.append((f"❌ 프로필 수정 페이지 이동 실패: {str(e)}", click_count))

# 최종 결과 저장
result_df = pd.DataFrame(step_log, columns=["단계", "현재 클릭 수"])
result_df.to_csv("signup_and_cancel_click_steps.csv", index=False, encoding="utf-8-sig")
print("✅ 해지 클릭 경로 저장 완료: signup_and_cancel_click_steps.csv")

driver.quit()