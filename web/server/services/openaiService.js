const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getSuggestionsAvoidingAllPatterns(inputText, patternList) {
  const allPatternsText = patternList
    .map((p, i) => `${i + 1}. ${p.title} - ${p.definition}`)
    .join("\n");

  const bannedWords = [
    // 📛 시간 압박 관련 단어 (urgency)
    "지금", "즉시", "빠르게", "서둘러", "오늘만", "기간 한정", "한정", "조속히", "곧 종료",

    // 📛 금전적 유도 및 과장 (sneaking, misdirection, obstruction 등)
    "혜택", "할인", "최대", "쿠폰", "무료", "와르르", "특별", "제공됩니다", "받을 수 있습니다", "경험해보세요", "절약"
  ];

  const prompt = `
너는 다크패턴을 제거하고, 사용자가 신뢰할 수 있는 UX 문장을 생성하는 전문가다.

다음은 피해야 할 다크패턴 유형들이다:
${allPatternsText}

사용자 입력 문장은 다음과 같다:
"${inputText}"

이 문장의 **핵심 의미는 유지하되**, 다음 조건을 **절대적으로 지켜서** 문장 2개만 생성하라:

**절대 포함하지 말아야 할 표현들**:
${bannedWords.join(", ")}

**지켜야 할 조건**:
1. 위 단어 또는 유사 표현을 절대 사용하지 말 것 (단어가 일부라도 포함되면 안 됨)
2. 다크패턴 유형(강제, 과장, 혜택 강조, 시간 압박, 유도 등)에 위반되지 않을 것
3. 사용자의 선택은 자유롭게, 정보는 중립적이고 사실 기반으로 제시할 것
4. 감정 유도, 불안 조성, 과도한 유도/강조 표현은 사용 금지
5. 사용자가 스스로 판단할 수 있도록 기능/정보 위주로 작성할 것

❗ **1번 문장은 가장 적절하고 추천할 수 있는 문장이어야 한다.**
2번 문장은 대안 문장으로 제공해라.

**출력 형식 (숫자와 문장만 포함):**
1. ...
2. ...
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "너는 UX 디자이너이자 윤리적 카피라이팅 전문가로서 사용자에게 신뢰 가능한 설명만 제공한다.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
  });

  const output = response.choices[0].message.content;

  return output
    .trim()
    .split("\n")
    .filter((line) => /^\d+\.\s/.test(line));
}

module.exports = { getSuggestionsAvoidingAllPatterns };
