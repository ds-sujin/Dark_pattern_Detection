from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import json

# 크롬 옵션 설정
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)



links = [
     "https://www.deceptive.design/cases/a-a-a-v-borjamotor-s-a",
    "https://www.deceptive.design/cases/a-a-a-v-predase-servicios-integrales-sl",
    "https://www.deceptive.design/cases/alstrom-din-isenkraemmer-aps-s-investigation-by-danish-data-protection-authority",
    "https://www.deceptive.design/cases/anonymous-complainant-v-dgu-erhverv-a-s",
    "https://www.deceptive.design/cases/anonymous-complainant-v-national-service-for-the-promotion-of-childcare-products",
    "https://www.deceptive.design/cases/asociacion-de-consumidores-y-usuarios-en-accion-facua-v-asociacion-de-afectados-por-las-asociaciones-de-consumidores-asocapac",
    "https://www.deceptive.design/cases/autoritatea-nationala-de-supraveghere-a-prelucrarii-datelor-cu-caracter-personal-v-orange-romania-sa",
    "https://www.deceptive.design/cases/belgian-dpa-s-investigation-against-toerisme-vlaanderen",
    "https://www.deceptive.design/cases/brigitte-a-v-n-co-material-gmbh",
    "https://www.deceptive.design/cases/bundeskartellamt-s-administrative-proceeding-against-google",
    "https://www.deceptive.design/cases/carrefour-france-investigation-by-cnil",
    "https://www.deceptive.design/cases/cma-s-investigation-against-nintendo-switch-playstation-and-xbox",
    "https://www.deceptive.design/cases/colour-car-sales-limited-s-investigation-by-uk-dpa",
    "https://www.deceptive.design/cases/competition-and-markets-authority-v-emma-sleep-gmbh",
    "https://www.deceptive.design/cases/consumer-financial-protection-bureau-v-transunion",
    "https://www.deceptive.design/cases/czech-dpa-s-investigation-into-anonymous-television-broadcaster",
    "https://www.deceptive.design/cases/d-a-a-a-and-d-b-b-b-claimants-v-asociacion-de-victimas-por-arbitrariedades-judiciales-java",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-on-behalf-of-neptunos-formacion-s-l-v-iweb-internet-learning-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-v-add-event-staff-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-v-eslora-proyectos-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-v-happy-friday-sl",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-v-hospital-recoletas-ponferrada-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-claimant-v-washpoint-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-through-cnil-v-societe-du-figaro",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-v-cooltra-motosharing-s-l-u",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-v-iberia-lineas-aereas-de-espana-s-a-operadora-unipersonal",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-v-preico-juridicos-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-v-radio-popular-s-a",
    "https://www.deceptive.design/cases/d-a-a-a-complainant-v-wind-tre-spa",
    "https://www.deceptive.design/cases/d-a-a-a-data-subject-v-canary-click-consulting-website",
    "https://www.deceptive.design/cases/d-a-a-a-data-subject-v-komplett-bank-asa",
    "https://www.deceptive.design/cases/d-a-a-a-data-subject-v-ori-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-data-subjects-v-infotv",
    "https://www.deceptive.design/cases/d-a-a-a-ors-v-caixabank-s-a",
    "https://www.deceptive.design/cases/d-a-a-a-v-abanca-corporacion-bancaria-s-a",
    "https://www.deceptive.design/cases/d-a-a-a-v-miguel-ibanez-bezanilla-s-l",
    "https://www.deceptive.design/cases/d-a-a-a-v-vueling-airlines-s-a",
    "https://www.deceptive.design/cases/d-aaa-claimant-v-banco-bilbao-vizcaya-argentaria-sa",
    "https://www.deceptive.design/cases/decision-of-the-national-commission-sitting-in-restricted-formation-on-deliberation-ndeg38fr-2021",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-committee-concerning-apple-distribution-international",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-committee-concerning-facebook-ireland-limited",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-committee-concerning-google-llc-and-google-ireland-limited",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-committee-concerning-microsoft-ireland-operations-limited",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-committee-on-voodoo",
    "https://www.deceptive.design/cases/deliberation-of-the-restricted-formation-san-2022-027-concerning-tiktok",
    "https://www.deceptive.design/cases/den-bla-avis-ex-officio-investigation-by-danish-dpa",
    "https://www.deceptive.design/cases/district-of-columbia-v-doordash",
    "https://www.deceptive.design/cases/district-of-columbia-v-grubhub",
    "https://www.deceptive.design/cases/district-of-columbia-v-maplebear-inc-d-b-a-instacart",
    "https://www.deceptive.design/cases/enforcement-action-by-ico-against-unite-the-union",
    "https://www.deceptive.design/cases/executive-committee-of-the-belgian-dpa-gba-v-rossel-cie",
    "https://www.deceptive.design/cases/executive-committee-of-the-belgian-dpa-gba-v-roularta-media-group",
    "https://www.deceptive.design/cases/federal-trade-commission-v-age-of-learning-inc-abcmouse-and-abcmouse-com",
    "https://www.deceptive.design/cases/federal-trade-commission-v-effen-ads-llc",
    "https://www.deceptive.design/cases/federal-trade-commission-v-universal-city-nissan",
    "https://www.deceptive.design/cases/federal-trade-commission-v-vonage-holdings-corporation",
    "https://www.deceptive.design/cases/ftc-and-the-state-of-illinois-v-north-american-automotive-services-inc-et-al",
    "https://www.deceptive.design/cases/ftc-v-amazon-com-inc",
    "https://www.deceptive.design/cases/ftc-v-prog-leasing",
    "https://www.deceptive.design/cases/geraldine-mahood-v-noom-inc",
    "https://www.deceptive.design/cases/ico-v-emailmovers-limited",
    "https://www.deceptive.design/cases/in-the-matter-of-adoreme-inc",
    "https://www.deceptive.design/cases/in-the-matter-of-credit-karma",
    "https://www.deceptive.design/cases/in-the-matter-of-epic-games-inc",
    "https://www.deceptive.design/cases/in-the-matter-of-homeadvisor-inc",
    "https://www.deceptive.design/cases/in-the-matter-of-lendedu",
    "https://www.deceptive.design/cases/in-the-matter-of-tiktok-technology-limited",
    "https://www.deceptive.design/cases/in-the-matter-of-urthbox-inc",
    "https://www.deceptive.design/cases/inspection-by-gba-x-y-website",
    "https://www.deceptive.design/cases/ireland-s-data-protection-commission-investigation-into-whatsapp-ireland-limited",
    "https://www.deceptive.design/cases/ireland-s-data-protection-commission-investigation-into-yahoo",
    "https://www.deceptive.design/cases/italian-data-protection-authority-sanctioning-measure-against-ediscom-spa",
    "https://www.deceptive.design/cases/johnny-ryan-pierre-dewitte-jeff-ausloos-la-ligue-des-droits-de-l-homme-bits-of-freedom-katarzyna-szymielewicz-v-iab-europe",
    "https://www.deceptive.design/cases/jp-politikens-hus-a-s-investigation-by-danish-dpa",
    "https://www.deceptive.design/cases/la-quadrature-du-net-v-amazon-europe-core",
    "https://www.deceptive.design/cases/megan-perkins-v-the-new-york-times-company",
    "https://www.deceptive.design/cases/meta-platforms-ireland-limited-and-instagram-social-media-network-s-investigation-by-dpc",
    "https://www.deceptive.design/cases/mr-a-a-a-claimant-v-just-landed-s-l",
    "https://www.deceptive.design/cases/mr-a-a-a-v-aranow-packaging-machinery",
    "https://www.deceptive.design/cases/mr-b-b-b-data-subject-v-ms-a-a-a-owner-of-commercial-website",
    "https://www.deceptive.design/cases/mr-x-the-complainant-v-y-housing-company-the-defendant",
    "https://www.deceptive.design/cases/mrs-a-a-a-lia-s-clothing-and-zulmar-santamaria-s-l",
    "https://www.deceptive.design/cases/ms-a-a-a-claimant-v-marbella-resorts-s-l",
    "https://www.deceptive.design/cases/ms-xx-complainant-v-douglas-italia-s-p-a",
    "https://www.deceptive.design/cases/n-a-through-his-guardian-v-nintendo-of-america",
    "https://www.deceptive.design/cases/national-data-protection-and-freedom-of-information-authority-v-anonymous-news-service-provider",
    "https://www.deceptive.design/cases/ngo-la-quadrature-du-net-lqdn-and-noyb-complainant-v-google-llc",
    "https://www.deceptive.design/cases/norwegian-consumer-council-complaint-against-amazon-prime",
    "https://www.deceptive.design/cases/organization-of-consumers-and-users-v-my-heritage-ltd",
    "https://www.deceptive.design/cases/planet-49-vs-ecj",
    "https://www.deceptive.design/cases/ramona-films-s-l-investigation-by-spanish-agency-for-the-protection-of-data",
    "https://www.deceptive.design/cases/sia-hh-invest-s-investigation-by-data-state-inspectorate",
    "https://www.deceptive.design/cases/state-of-arizona-ex-rel-mark-brnovich-attorney-general-v-google-llc",
    "https://www.deceptive.design/cases/subdirectorate-general-for-data-inspection-v-flexografica-del-mediterraneo-s-l",
    "https://www.deceptive.design/cases/swedish-dpa-s-investigation-of-klarna-bank-ab",
    "https://www.deceptive.design/cases/tiktok-s-ex-officio-investigation-by-dutch-dpa",
    "https://www.deceptive.design/cases/united-states-of-america-v-mylife-com-inc-and-jeffrey-tinsley",
    "https://www.deceptive.design/cases/uodo-s-investigation-against-clickquicknow-sp-z-o-o",
    "https://www.deceptive.design/cases/we-buy-any-car-limited-investigation-by-information-commissioner-s-office",
    "https://www.deceptive.design/cases/x-the-complainant-v-y-the-defendant"
]


results = []

for i, link in enumerate(links):
    try:
        driver.get(link)
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # 제목
        title_elem = soup.select_one("body > div > div:nth-child(3) > header > div > div > div > div > div.margin-bottom.margin-small > h1")
        title = title_elem.get_text(strip=True) if title_elem else "제목 없음"

        # Excerpt, Our analysis, Outcome, Parties, Case number는 같은 영역에서 추출됨
        paragraphs = soup.select("#w-node-_7c05c3c3-e242-a81d-fb36-85bc2ce1d55f-f592b3d3 > p")
        excerpt = paragraphs[0].get_text(strip=True) if len(paragraphs) > 0 else None
        our_analysis = paragraphs[1].get_text(strip=True) if len(paragraphs) > 1 else None

        outcome_elem = soup.select_one("#w-node-ca0a64f7-b061-1e5d-cde6-d29cf592b3d9-f592b3d3 > p")
        outcome = outcome_elem.get_text(strip=True) if outcome_elem else None

        # Parties 및 Case number는 outcome 바로 아래 문단들에서 추정
        parties = None
        case_number = None
        next_siblings = outcome_elem.find_next_siblings("p") if outcome_elem else []
        if len(next_siblings) > 0:
            parties = next_siblings[0].get_text(strip=True)
        if len(next_siblings) > 1:
            case_number = next_siblings[1].get_text(strip=True)

        # Related deceptive patterns
        pattern_elems = soup.select("#w-node-_2d06014e-df63-2d00-fe92-091502d96b5f-0e9c10e3 > a > div")
        related_patterns = [p.get_text(strip=True) for p in pattern_elems]

        # Related laws
        law_elems = soup.select("#w-node-_2b21b8c2-4a83-cc85-6a85-9031cac28696-0e9c10e3 > a > div")
        related_laws = [l.get_text(strip=True) for l in law_elems]

        result = {
            title: {
                "Excerpt": excerpt,
                "Our analysis": our_analysis,
                "Outcome": outcome,
                "Parties": parties,
                "Case number": case_number,
                "Related deceptive patterns": related_patterns,
                "Related laws": related_laws,
            },
            "url": link
        }

        results.append(result)
        print(f"[{i+1}] ✅ {title}")

    except Exception as e:
        print(f"[{i+1}] ❌ 오류 발생: {link}")
        print("오류 내용:", str(e))
        continue

driver.quit()

# JSON 저장
with open("cases_detailed.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("🎉 전체 크롤링 완료! cases_detailed.json 저장됨.")