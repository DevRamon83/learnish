export const getSummaryTitle = (summaryTitle) => {
  if (summaryTitle.length < 25) {
    return summaryTitle;
  } else {
    return summaryTitle.substring(0, 25) + " ...";
  }
};

export const getSummaryStatus = (summary) => {
  const { isDraft, misalignment } = summary;
  if (isDraft) return "correggi";
  if (misalignment) return "genera statistiche";
  return "apri";
};

export const getSummaryDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
