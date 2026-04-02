export default function ReadSummary({ setter, date }) {
  const wrote = new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <p className="summary__read" onClick={() => setter(true)}>
      <span className="summary__date">{wrote}</span>
      <span className="btn__arrow">⊳</span>
    </p>
  );
}
