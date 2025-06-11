import json

# 1. 원본 JSON 로드 (리스트 구조)
with open("cases_detailed.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# 2. 변환 리스트
converted = []

for item in raw_data:
    for case_title, case_data in item.items():
        if case_title == "url":
            continue  # url은 따로 처리
        case_data["title"] = case_title

        # URL 병합
        if "url" in item:
            case_data["url"] = item["url"]

        # 제거할 필드들
        for field_to_remove in ["Parties", "Case number"]:
            if field_to_remove in case_data:
                del case_data[field_to_remove]

        converted.append(case_data)

# 3. JSON 파일로 저장
with open("cases_converted.json", "w", encoding="utf-8") as f:
    json.dump(converted, f, ensure_ascii=False, indent=2)

print(f"✅ 변환 완료: 총 {len(converted)}개 케이스 저장됨 (cases_converted.json)")


# 1. 원본 JSON 불러오기
with open("dark_patterns.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)  # 딕셔너리 구조

# 2. 변환: 리스트 형태로 평탄화
converted_list = []

for pattern_name, content in raw_data.items():
    # title 필드 추가
    content["title"] = pattern_name
    converted_list.append(content)

# 3. 새 JSON 파일로 저장
with open("patterns_converted.json", "w", encoding="utf-8") as f:
    json.dump(converted_list, f, ensure_ascii=False, indent=2)

print(f"✅ 변환 완료: {len(converted_list)}개 패턴이 저장됨 (patterns_converted.json)")