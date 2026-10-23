import { gridGenerator } from "./lineChartBlueprint";

const updateGrid = (schema, key, position, data, period) => {
  schema[key][period][position].errors += data.errors[key];
  schema[key][period][position].words += data.words;
};

const updateSchema = (data, schema) => {
  const keys = Object.keys(data.errors);

  for (const key of keys) {
    if (!schema[key]) continue;

    if (data.semiAnnually) {
      const position = data.semiAnnuallyPosition;
      updateGrid(schema, key, position, data, "semiAnnually");
    }
    if (data.quarter) {
      const position = data.quarterPosition;
      updateGrid(schema, key, position, data, "quarter");
    }
    if (data.monthly) {
      const position = data.monthlyPosition;
      updateGrid(schema, key, position, data, "monthly");
    }

    if (data.weekly) {
      const position = data.weeklyPosition;
      updateGrid(schema, key, position, data, "weekly");
    }
  }
};

const iterateOnDayStats = (dayStat, month, year, schema, now) => {
  const errors = {
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
  const day = dayStat.day;
  const msUTC = Date.UTC(year, month - 1, day);

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const weeklyValue = 7 * ONE_DAY_MS;
  const monthlyValue = 30 * ONE_DAY_MS;
  const quarterValue = 90 * ONE_DAY_MS;
  const semiAnnuallyValue = 180 * ONE_DAY_MS;

  const weeklyStart = now - weeklyValue;
  const monthlyStart = now - monthlyValue;
  const quarterStart = now - quarterValue;
  const semiAnnuallyStart = now - semiAnnuallyValue;

  const errorArray = dayStat.errorTypes;
  errorArray.forEach((err) => {
    if (errors[err] !== undefined) errors[err]++;
  });

  const isWeekly = msUTC > weeklyStart;
  const isMonthly = msUTC > monthlyStart;
  const isQuarter = msUTC > quarterStart;
  const isSemiAnnually = msUTC > semiAnnuallyStart;

  updateSchema(
    {
      errors,
      words: dayStat.words,
      total: true,
      semiAnnually: isSemiAnnually,
      semiAnnuallyPosition: isSemiAnnually
        ? Math.floor((msUTC - semiAnnuallyStart) / ONE_DAY_MS)
        : null,
      quarter: isQuarter,
      quarterPosition: isQuarter
        ? Math.floor((msUTC - quarterStart) / ONE_DAY_MS)
        : null,
      monthly: isMonthly,
      monthlyPosition: isMonthly
        ? Math.floor((msUTC - monthlyStart) / ONE_DAY_MS)
        : null,
      weekly: isWeekly,
      weeklyPosition: isWeekly
        ? Math.floor((msUTC - weeklyStart) / ONE_DAY_MS)
        : null,
    },
    schema,
  );
};

const iterateOnMonthly = (obj, month, year, schema, now) => {
  for (const day of obj.dayStat) {
    iterateOnDayStats(day, month, year, schema, now);
  }
};

export const getLineChartData = (data, now) => {
  const schema = gridGenerator();

  // each obj is a month
  for (const obj of data) {
    const monthly = obj.month;
    const year = obj.year;
    iterateOnMonthly(obj, monthly, year, schema, now);
  }
  return schema;
};

export const getStackedData = (average, errorKeys) => {
  const rawAverage = [];
  const averageWords = average.words / 100;
  let totalMistakes = 0;
  for (const error of errorKeys) {
    const errors = average.errorTypes[error] * averageWords;
    totalMistakes += errors;
    rawAverage.push({
      id: error,
      errors,
    });
  }

  return { totalMistakes, rawAverage };
};
