export default function SummaryErrorTab({ errorCodes, id, setCurrentError }) {
  const errors = [...new Set(errorCodes)];
  return (
    <div className="summary__error-tab">
      {errors.map((error) => (
        <div
          key={`${id}${error}}`}
          onClick={() => setCurrentError(error)}
          className={`summary__error-${error}`}
        ></div>
      ))}
      <div></div>
    </div>
  );
}
