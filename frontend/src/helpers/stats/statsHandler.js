import { average } from "./calculators";

const statsHandler = (stats, dispatch, setStats) => {
  const data = {
    average: { score: {}, errorTypes: {}, mistakes: 0, words: 0, summaries: 0 },
    data: stats,
  };

  let totSummary = 0;
  let totMistakes = 0;
  let totWords = 0;
  const dayStats = [];
  const errorsCounter = {
    spell: 0,
    tens: 0,
    agree: 0,
    prep: 0,
    word: 0,
    order: 0,
    sing: 0,
    art: 0,
    pron: 0,
  };

  const totScores = {
    overall: 0,
    grammar: 0,
    cohesion: 0,
    vocabulary: 0,
  };

  for (let i = 0; i < stats.length; i++) {
    totSummary += stats[i].dayStat.length;
    const array = stats[i].dayStat;
    dayStats.push(...array);
  }

  for (let i = 0; i < dayStats.length; i++) {
    totMistakes += dayStats[i].mistakes;
    totWords += dayStats[i].words;
    const errorTypes = dayStats[i].errorTypes;
    errorTypes.forEach((error) => {
      if (typeof errorsCounter[error] !== "number") return;
      const tot = errorsCounter[error] + 1;
      errorsCounter[error] = tot;
    });

    const scores = dayStats[i].score || {};
    const scoreKey = Object.keys(scores);

    scoreKey.forEach((key) => {
      if (typeof totScores[key] !== "number") return;
      const tot = totScores[key] + scores[key];
      totScores[key] = tot;
    });
  }

  data.average.score.overall = average(totScores.overall, totSummary, 1);
  data.average.score.grammar = average(totScores.grammar, totSummary, 1);
  data.average.score.cohesion = average(totScores.cohesion, totSummary, 1);
  data.average.score.vocabulary = average(totScores.vocabulary, totSummary, 1);

  const errors = Object.keys(errorsCounter);

  errors.forEach((error) => {
    const ratio = (errorsCounter[error] / totWords) * 100;
    data.average.errorTypes[error] = +ratio.toFixed(1);
  });

  const averageWords = totWords / totSummary;
  data.average.words = parseInt(averageWords);

  data.average.mistakes = average(totMistakes, totSummary, 1);

  data.average.summaries = totSummary;

  dispatch(setStats(data));
};

export default statsHandler;
