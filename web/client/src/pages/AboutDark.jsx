// src/pages/AboutDark.jsx
import React, { useState } from 'react';
import './AboutDark.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '../components/button';

const darkPatterns = {
  intro: {
    title: '다크패턴이란?',
    description: '다크패턴이란, 웹사이트나 앱에서 사용자가 원하지 않는 행동을 하도록 유도하거나, \n놀라운 선택을 하도록 유도하는 디자인을 말합니다.',
  },
  Sneaking: {
    title: 'Sneaking',
    subtitle: '몰래 끼워넣기',
    description: '사용자가 모르게 제품이나 옵션을 추가하거나, 중요한 정보를 뒤늦게 숨겨서 보여주는 방식입니다.',
    details: [
      {
        subtype: '몰래 장바구니 추가 (Sneak into Basket)',
        description:
          '사용자가 직접 선택하지도 않았거나 사용자의 동의 없이, 상품이나 추가 요금이 자동으로 장바구니에 들어가 있는 경우입니다.',
        example:
          '배달앱의 최종 결제 단계에서 "사은품 햄버거 추가"가 자동 선택되어 결제 금액이 증가된 상태로 사용자가 인지하지 못한 채 결제한 경우.',
        image: "/aboutdark/sneakingEx1.svg",
        problems: [
          '내가 원하지 않은 걸 모르고 사게 될 수 있음',
          '주의 깊게 확인하지 않으면 추가 요금이 발생',
          '결제 단계에서 다시 처음 단계로 가야하는 문제 발생'
        ],
        checkPoints: [
          '옵션을 자세히 확인하기',
          '미리 체크되어 있는 옵션 등의 내용을 확인하기'
        ]
      },
      {
        subtype: '숨겨진 비용 패턴 (Hidden Costs)',
        description:
          '사용자가 단순히 무료 체험이나 임시로 구매하고 생각했던 서비스와 실제로는 정기적인 유료 결제가 숨어 있는 경우를 말합니다.',
        example:
          '음악 스트리밍 서비스가 "7일 무료 체험"을 제공한다고 하며 사용자 동의 없이 결제 정보를 요구하고, 체험 기간이 지나면 유료 전환되는 조건이 명확히 안내되지 않아 사용자가 모르는 사이 결제되는 경우.',
        image: "/aboutdark/sneakingEx2.svg",
          problems: [
          '사용자 의도와 다르게 돈이 계속 나가도록 합니다.',
          '구독임을 눈치채지 못하게 숨겨져 있습니다.',
          '해지 절차가 복잡하거나 숨겨져 있어서 피해가 증가합니다.',
          '특히 디지털 소액결제는 나중에 알아채기 어렵습니다.'
        ],
        checkPoints: [
          '체험 전부터 이용약관과 결제 조건을 꼭 확인하세요',
          '무료 체험이라도 카드 정보를 요구할 경우 주의하세요',
          '소셜 앱, 음악 앱 등 무료/체험이라는 단어 뒤에 정기결제가 숨어 있을 수 있습니다',
          '“작은 글씨”에 숨어 있는 조건이 없는지 꼼꼼히 살펴보세요'
        ]
      }
    ]
  },
  Urgency: {
    title: 'Urgency',
    subtitle: '긴급성 부여',
    description: '판매나 거래에 마감일을 부과하여 사용자의 의사결정과 구매를 가속화 시킵니다.',
       details: [
      {
        subtype: '카운트다운 타이머 (Countdown Timers)',
        description:
          '사이트나 앱에서 실시간으로 줄어드는 타이머를 표시해 구매 기한이 얼마 남지 않은 것처럼 보이게 합니다. 이 타이머는 실제 마감 시점과 무관하거나 리셋되는 경우가 많습니다.',
        example:
          'A 쇼핑몰에서 “할인 마감까지 05:00분” 이라는 식의 시간이 줄어드는 타이머를 보여줍니다. 하지만 5분이 지나도 페이지를 다시 접속하면 다시 5분이 시작되는 경우를 말합니다.',
        problems: [
          '실제 마감 시간이 아니므로 허위 정보에 기반한 판단을 유도합니다.',
          '사용자에게 충분한 비교를 할 기회를 빼앗습니다.',
          '심리적 압박감으로 인한 후회성 구매를 유도합니다.'
        ],
        checkPoints: [
          '타이머가 다른 페이지에서도 동일하게 작동하는지 확인하세요.',
          '해당 페이지를 새로고침 했을 때 타이머가 리셋되는지 확인하세요.',
          '타이머가 끝났는데 할인이 지속되는지 확인해보세요.'
        ]
      },
       {
        subtype: '한정 시간 메세지 (Limited-time Messages)',
        description:
          '한정된 시간만 혜택이 주어지는 것처럼 광고 하는 메세지를 말합니다. 이 메세지는 종종 계속 되거나, 시간이 지나도 혜택이 유지되는 경우가 많습니다.',
        example:
          'B 쇼핑앱에서 “주말 특가! 단 이틀동안 세일합니다" 라는 문구를 보고 기간에 옷을 구매하였습니다. 하지만 다음 주에도 똑같은 “이틀 한정 세일"이라는 문구로 세일을 진행하였습니다. 결국은 매주 반복되는 세일이었습니다.',
        problems: [
          '“지금 안 사면 손해일 것 같아"라는 조바심을 유도합니다.',
          '늘 있는 혜택인데, 사용자를 속여서 구매를 촉진시킵니다.',
          '생각할 시간을 충분히 주지 않고 충동구매를 하게 됩니다.'
        ],
        checkPoints: [
          '다음 날이나 며칠 뒤에 다시 들어가 똑같은 메세지가 반복되는지 확인하세요.',
          '다른 사이트나 앱에서도 가격 비교를 해서 실제 혜택인지 확인하세요.',
          '메세지의 시작일과 종료일이 명확하게 명시되어 있는지 확인하세요.'
        ]
      },
    ]
  },
  Misdirection: {
    title: 'Misdirection',
    subtitle: '주의 분산',
    description: '사용자의 주의를 의도적으로 다른 방향으로 유도하여 원치 않는 행동을 하도록 만듭니다. \n이는 사용자가 실제로 원하는 선택지를 찾기 어렵게 하거나, 덜 눈에 띄게 배치함으로써 발생합니다.',
       details: [
      {
        subtype: '수치심 부여 (Confirmshaming)',
        description:
          '거절 선택지를 부끄럽거나 죄책감을 드는 문구를 사용하여 사용자의 선택을 압박합니다.',
        example:
          '화장품 사이트에서 “10% 할인 받기” 팝업에 거절 문구가 “괜찮아요, 제 피부는 망가져도 돼요”로 되어 있어, 결국 불쾌함을 느끼고 원치 않는 쿠폰을 수락하게 됩니다.',
        problems: [
          '감정을 조작하여 비합리적인 선택을 유도합니다.',
          '사용자에게 정당한 거절권을 허용하지 않고, 심리적으로 선택을 압박합니다.'
        ],
        checkPoints: [
          '거절/해지 문구가 수치심을 유발하는 문구, 부정적 문구를 사용하는지 확인하세요.'
        ]
      },
      {
        subtype: '시각적 간섭  (Visual Interference)',
        description:
          '스타일과 시각적 표현을 사용하여 사용자가 특정 선택을 하도록 유도합니다.',
        example:
          '뉴스 구독 서비스에서 “무료 체험” 버튼은 크고 눈에 띄지만 “건너뛰기” 버튼은 작고 흐릿하게 배치되어, 의도치 않게 유료 체험을 시작하게 됩니다.',
        problems: [
          '사용자가 의도하지 않은 선택을 하게 될 수 있습니다.',
          '시각적 요소(색상, 크기, 위치 등)으로 사용자의 시선을 속입니다.'
        ],
        checkPoints: [
          '버튼 크기, 색상, 위치가 균형 있게 구성되어 있는지 살펴보세요.',
          '의도적으로 눈에 띄는 디자인에 대해서 주의를 기울이세요.'
        ]
      },
      {
        subtype: '트릭 질문  (Trick Questions)',
        description:
          '혼란스러운 언어를 사용해 사용자를 헷갈리게 하여 특정 선택을 하도록 유도합니다.',
        example:
          '쇼핑몰 가입 시 “수신을 원하지 않으시면 체크”라는 이중부정 문구로 인해, 의미를 혼동해 원치 않는 광고 메일을 받게 됩니다.',
        problems: [
          '사용자의 인지 오류를 유도하여 본인의 의사와 다른 선택을 하게 만듭니다.',
          '혼란을 이용한 설정 변경은 개인정보 보호 측면에서도 심각합니다.'
        ],
        checkPoints: [
          '혼란스러운 문구라면, 한 번 더 천천히 읽고 판단하세요.',
          '체크박스의 문구가 무엇을 의미하는지 정확히 이해한 뒤 선택하세요.',
          '주기적으로 계정 설정을 확인해 원치 않는 구독이 없는지 점검하세요.'
        ]
      },
      {
        subtype: '압박 판매  (Pressed Selling)',
        description:
          '인지 편향을 활용하여 비싼 제품을 더 많이 사게 만들거나 관련 상품을 함께 사게 만듭니다.',
        example:
          '여행 사이트에서 항공권을 결제하려 할 때, 보험과 수하물 옵션이 자동 선택된 상태로 포함되어 사용자가 의도하지 않은 금액을 결제하게 됩니다.',
        problems: [
          '의도하지 않은 비용 지출이 발생할 수 있고, 소비자 신뢰를 해칩니다.',
          '사용자가 구매 결정을 스스로 통제하지 못하게 됩니다.'
        ],
        checkPoints: [
          '결제 전에 추가 항목이 자동 체크되어 있지는 않은지 꼭 확인하세요.',
          '“다음” 버튼만 누르지 말고, 각 옵션을 꼼꼼히 해제하거나 검토하세요.',
          '총 결제 금액과 항목을 다시 한번 확인하세요.'
        ]
      },
    ]
  },
  SocialProof: {
    title: 'Social Proof',
    subtitle: '사회적 증거',
    description: '다수의 행동이나 선택을 근거로 삼아, 사용자가 자신의 판단보다 다른 사람들의 행동을 따르도록 유도하는 방식입니다. 이 방식은 사회적 동조 심리를 활용하여 사용자의 의사결정을 조작합니다.',
       details: [
      {
        subtype: '활동 알림 (Activity Notification)',
        description:
          '사용자 주변의 활동이나 다른 사용자의 행동을 실시간으로 보여주어 특정 행동을 유도하는 방식입니다.',
        example:
          '쇼핑 사이트에서 화면 하단에 “서울에서 누군가 이 상품을 5분 전에 구매했습니다”라는 알림이 주기적으로 뜹니다. 이는 실제 데이터가 아닐 수도 있고, 사용자에게 구매 압박감을 주기 위해 연출된 경우도 있습니다.',
        problems: [
          '실시간처럼 보이는 정보가 허위이거나 조작일 수 있습니다.',
          '사용자에게 심리적 긴장감이나 불안감을 유발해 충동 구매로 이어질 수 있습니다.',
          '특정 상품이나 서비스가 비정상적으로 인기 있는 것처럼 왜곡될 수 있습니다.'
        ],
        checkPoints: [
          '해당 알림이 반복되거나 너무 자주 뜨는 경우, 자동 생성일 가능성을 의심해보세요.',
          '실시간 정보라는 표현이 있어도, 그 근거 출처가 명확한지 확인하세요.'
        ]
      },
      {
        subtype: '불분명한 출처의 추천사  (Testimonials of Uncertain Origin)',
        description:
          '출처가 명확하지 않거나 검증되지 않은 사용자 후기, 평가, 추천글을 노출하여 제품이나 서비스를 신뢰하도록 유도하는 방식입니다.',
        example:
          '어떤 서비스 페이지에 “이 앱은 제 삶을 바꿨어요!”라는 사용자 후기가 큼지막하게 보이지만, 작성자 이름, 시점, 출처, 인증 등이 전혀 없는 상태입니다. 심지어 이 후기는 마케팅 부서에서 자체 작성한 것일 수도 있습니다.',
        problems: [
          '사용자가 신뢰할 수 없는 정보에 기반해 판단하게 됩니다.',
          '후기의 사실 여부를 확인할 방법이 없어, 객관성이나 공정성에 대한 오해를 유발할 수 있습니다',
          '조작된 추천은 서비스에 대한 과도한 기대를 유발하거나 실망감으로 이어질 수 있습니다.'
        ],
        checkPoints: [
          '후기의 작성자 정보, 날짜, 리뷰 플랫폼 등이 있는지 확인하세요.',
          '긍정적인 후기만 있거나 비슷한 표현이 반복되는 경우, 자동 생성이나 마케팅 조작을 의심하세요.'
        ]
      },
    ]
  },
  Scarcity: {
    title: 'Scarcity',
    subtitle: '인위적 희소성',
    description: '재고가 거의 없거나, 기회가 곧 사라질 것처럼 보이게 하여 사용자가 서둘러 행동하도록 유도하는 방식입니다. \n희소성을 사용하여 조급함과 불안감을 유발합니다.',
       details: [
      {
        subtype: '낮은 재고 메세지  (Low-stock Meessages)',
        description:
          '상품이 곧 품절될 것처럼 보이도록, 재고 수량을 일부러 적게 표시하거나 “재고 1개 남음” 같은 메시지로 구매를 서두르게 유도하는 방식입니다.',
        example:
          '한 전자기기 쇼핑몰에서 인기 있는 무선 이어폰에 “남은 수량 2개!”라는 알림이 뜨지만, 다음 날 다시 방문해도 같은 메시지가 반복되어 노출됩니다.',
        problems: [
          '실제 재고와 무관한 정보일 수 있어 허위 정보로 소비 결정을 유도합니다.',
          '사용자는 충동적으로 구매하게 되고, 충분한 비교/숙고 시간이 차단됩니다.',
          '반복 노출 시 플랫폼에 대한 신뢰도 저하로 이어질 수 있습니다.'
        ],
        checkPoints: [
          '동일 문구가 다음 날에도 반복되는지 확인해보세요.',
          '다른 사이트나 오프라인 매장에서도 같은 상품이 판매되는지 확인해보세요.',
          '재고 수에 압박받기보단, 실제 필요 여부를 우선 고려하세요.'
        ]
      },
      {
        subtype: '고수요 메세지  (High-demand Messages)',
        description:
          '특정 상품이나 서비스가 현재 매우 인기가 많다거나 많은 사람이 관심을 가지고 있다는 식으로 표현해 사용자가 놓치지 않기 위해 서두르도록 유도하는 방식입니다.',
        example:
          '호텔 예약 사이트에서 “이 호텔을 24명이 지금 보고 있어요”라는 문구가 나타납니다. 그러나 이 수치는 고정되어 있거나, 페이지를 새로 고침해도 동일하게 반복됩니다.',
        problems: [
          '실시간 수요처럼 보이게 하지만, 실제 데이터가 아닐 수 있어 과장된 사회적 압박을 줍니다.',
          '이는 소비자의 정보 탐색 시간을 줄이고, 구매를 서두르게 해 비합리적 결정을 조장합니다.'
        ],
        checkPoints: [
          '“몇 명이 보고 있음”, “인기 급상승” 같은 문구는 근거가 제시되지 않으면 의심해보세요.',
          '해당 문구가 항상 같은 숫자로 반복되는지 새로고침이나 시간 간격을 두고 살펴보세요.',
          '내 상황과 조건에 맞는 선택인지 한 번 더 확인하세요.'
        ]
      },
    ]
  },
  Obstruction: {
    title: 'Obstruction',
    subtitle: '방해하기',
    description: '원하는 행동을 어렵고 복잡하게 만들어 사용자의 진행을 방해하거나 지연시키는 방식입니다. \n주로 가입은 쉽게, 해지는 어렵게 만들어 사용자의 이탈을 막으려 합니다.',
    details: [
      {
        subtype: '해지 어렵게 만들기  (Hard to Cancel)',
        description:
          '서비스 해지를 복잡하거나 번거롭게 만들어, 사용자가 탈퇴를 포기하게 유도하는 방식입니다.',
        example:
          '한 영상 스트리밍 서비스에서 구독은 클릭 몇 번으로 가능하지만, 해지는 고객센터에 전화해야만 가능하며, 운영 시간도 평일 낮으로 제한되어 있어 많은 사용자가 해지를 미루게 됩니다.',
        problems: [
          '사용자에게 불필요한 시간과 노력을 강요합니다.',
          '의도적으로 이탈을 방해하여, 사용자가 원하지 않는 서비스에 계속 비용을 지불하게 만들 수 있습니다.',
          '공정하지 않은 UX 설계로 소비자 권리를 침해합니다.'
        ],
        checkPoints: [
          '가입 전, 해지 절차가 명확하고 간단한지 먼저 확인하세요.',
          '해지 조건이 까다롭다면, 대체 서비스를 고려해 보세요.',
          '반복 결제 설정 여부를 꼭 확인하고, 자동결제 해지 방법을 미리 체크해 두세요.'
        ]
      },
    ]
  },
  ForcedAction: {
    title: 'Forced Action',
    subtitle: '강제 동의',
    description: '추가적이고 간접적인 작업을 수행하도록 요구합니다.',
    details: [
      {
        subtype: '강제 동의하기 (Forced Action)',
        description:
          '“이메일 수신에 동의해야만 다음 단계로 진행 가능”, “로그인 해야 볼 수 있습니다.”처럼 원하지 않는 가입, 동의, 정보 제공 등을 필수 조건처럼 강요하는 방식입니다. 사용자는 서비스를 이용하기 위해 부가적인 행동을 억지로 수행하게 됩니다. ',
        example:
          '한 온라인 쇼핑몰에서 제품 정보를 보기 위해 계정을 생성해야 하며, 그 과정에서 마케팅 이메일 수신에 동의하지 않으면 가입이 불가능하도록 구성되어 있어 원치 않는 동의를 강요받게 됩니다.',
        problems: [
          '사용자의 자발적 선택권을 침해합니다.',
          '최소한의 서비스 이용에도 과도한 개인정보 제공을 요구합니다.',
          '서비스 접근을 미끼로 비합리적인 동의를 강제합니다.'
        ],
        checkPoints: [
          '‘필수 동의’ 항목이 실제로 필요한 정보인지 다시 한 번 확인하세요.',
          '꼭 필요한 서비스가 아니라면 비슷한 다른 대안을 찾아보세요.'
        ]
      },
    ]
  },
};

function AboutDark() {
  const [selected, setSelected] = useState('intro');
  const keys = Object.keys(darkPatterns);
  const currentIndex = keys.indexOf(selected);
  const prevKey = keys[currentIndex - 1];
  const nextKey = keys[currentIndex + 1];

  return (
    <div className="page-container"> 
      <Navbar />
      <div className="about-container">
        <aside className="about-sidebar">
          <h4>다크패턴 유형</h4>
          <ul>
            {keys.map((key) => (
              <li
                key={key}
                className={selected === key ? 'active' : ''}
                onClick={() => setSelected(key)}
              >
                {key === 'intro' ? '다크패턴이란?' : darkPatterns[key].title}
              </li>
            ))}
          </ul>
        </aside>

        <section className="about-content">
          <div className="about-description-box">
            <h2>{darkPatterns[selected].title}</h2>
            {darkPatterns[selected].description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {selected === 'intro' ? (
            <>
              <h3>다크패턴 유형</h3>
              <p>다크패턴 관련 선행 연구들을 바탕으로 아래 7가지 유형으로 분류하였습니다.<br />다크패턴 유형을 누르면 해당 설명으로 이동합니다.</p>
              <div className="about-card-grid">
                {Object.entries(darkPatterns).slice(1).map(([key, val]) => (
                  <div className="about-card" key={key} onClick={() => setSelected(key)}>
                    <div className="card-title">{val.title}</div>
                    <div className="card-subtitle">{val.subtitle}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            darkPatterns[selected].details && (
              <div className="about-detail-box">
                {darkPatterns[selected].details.map((item, idx) => (
                  <div key={idx} className="detail-section">
                    <div className="detail-two-column">
                      <div className="detail-left">
                        <div className="detail-subtype-wrapper">
                          <span className="detail-label">세부 유형{idx + 1}</span>
                          <h4 className="detail-subtype">{item.subtype}</h4>
                        </div>
                        <p className="detail-description">{item.description}</p>
                      </div>
                      <div className="detail-right">
                        <h5 className="example-heading">예시</h5>
                        <p className="example-text">{item.example}</p>
                        {item.image && <img src={item.image} alt="예시 이미지" className="example-image" />}
                        <h5 className="problem-heading">왜 문제일까요?</h5>
                        <ul className="problem-list">
                          {item.problems.map((p, pidx) => (
                            <li key={pidx}>{p}</li>
                          ))}
                        </ul>
                        <h5 className="check-heading">확인할 점</h5>
                        <ul className="check-list">
                          {item.checkPoints.map((c, cidx) => (
                            <li key={cidx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="about-nav-buttons">
            {prevKey && (
              <button
                onClick={() => {
                  setSelected(prevKey);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← {darkPatterns[prevKey].title}
              </button>
            )}

            {nextKey && (
              <button
                onClick={() => {
                  setSelected(nextKey);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {darkPatterns[nextKey].title} →
              </button>
            )}
                      </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AboutDark;
