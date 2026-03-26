const isUnique = async (model, keys, obj) => {
  const query = keys.map((key) => ({ [key]: obj[key].toLowerCase().trim() }));

  const data = await model.findOne({ $or: query });

  if (!data) return { error: false };

  const conflict = keys.filter(
    (key) => data[key] === obj[key].toLowerCase().trim(),
  );

  return { error: true, conflict };
};

export default isUnique;
