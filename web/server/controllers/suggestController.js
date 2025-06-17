const PatternType = require("../db/patterntype");
const { getSuggestionsAvoidingAllPatterns } = require("../services/openaiService");

exports.suggestSentences = async (req, res) => {
  const { text } = req.body;

  try {
    // ✅ title과 definition만 가져오기
    const patterns = await PatternType.find({}, { title: 1, definition: 1, _id: 0 });



    const suggestions = await getSuggestionsAvoidingAllPatterns(text, patterns);
    res.json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "추천 문장 생성 실패" });
  }
};
