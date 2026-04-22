const statsHandler = (stats, dispatch, setStats) => {
  const data = {
    average: { score: {}, errortypes: {}, mistakes: 0, words: 0, summaries: 0 },
    data: stats,
  };

  let totalSummary = 0;
  let totalMistakes = 0;
  let totalWords = 0;
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

  const scoresCounter = {
    overall: 0,
    grammar: 0,
    cohesion: 0,
    vocabulary: 0,
  };

  for (let i = 0; i < stats.length; i++) {
    totalSummary += stats[i].dayStat.length;
    const array = stats[i].dayStat;
    dayStats.push(...array);
  }

  for (let i = 0; i < dayStats.length; i++) {
    totalMistakes += dayStats[i].mistakes;
    totalWords += dayStats[i].words;
    const errorTypes = dayStats[i].errorTypes;
    errorTypes.forEach((error) => {
      if (typeof errorsCounter[error] !== "number") return;
      const total = errorsCounter[error] + 1;
      errorsCounter[error] = total;
    });

    const scores = dayStats[i].score || {};
    const scoreKey = Object.keys(scores);

    scoreKey.forEach((key) => {
      if (typeof scoresCounter[key] !== "number") return;
      const total = scoresCounter[key] + scores[key];
      scoresCounter[key] = total;
    });
  }

  const overall = scoresCounter.overall / totalSummary;
  data.average.score.overall = +overall.toFixed(1);
  const grammar = scoresCounter.grammar / totalSummary;
  data.average.score.grammar = +grammar.toFixed(1);
  const cohesion = scoresCounter.cohesion / totalSummary;
  data.average.score.cohesion = +cohesion.toFixed(1);
  const vocabulary = scoresCounter.vocabulary / totalSummary;
  data.average.score.vocabulary = +vocabulary.toFixed(1);

  const errors = Object.keys(errorsCounter);

  errors.forEach((error) => {
    const ratio = (errorsCounter[error] / totalWords) * 100;
    data.average.errortypes[error] = +ratio.toFixed(1);
  });

  const averageWords = totalWords / totalSummary;
  data.average.words = parseInt(averageWords);

  const averageMistakes = totalMistakes / totalSummary;
  data.average.mistakes = +averageMistakes.toFixed(1);

  data.average.summaries = totalSummary;

  dispatch(setStats(data));
};

export default statsHandler;
