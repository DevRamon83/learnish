const blueprint = {
  spell: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  tens: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  agree: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  prep: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  word: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  order: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  sing: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  art: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
  pron: {
    semiAnnually: [],
    quarter: [],
    monthly: [],
    weekly: [],
  },
};

const populate = (range, array) => {
  for (let i = 0; i < range; i++) {
    array.push({ errors: 0, words: 0 });
  }
};

export const gridGenerator = () => {
  const keys = Object.keys(blueprint);

  for (const value of keys) {
    const semiAnnually = [];
    const quarter = [];
    const monthly = [];
    const weekly = [];

    populate(180, semiAnnually);
    populate(90, quarter);
    populate(30, monthly);
    populate(7, weekly);
    blueprint[value].semiAnnually = semiAnnually;
    blueprint[value].quarter = quarter;
    blueprint[value].monthly = monthly;
    blueprint[value].weekly = weekly;
  }

  return blueprint;
};
