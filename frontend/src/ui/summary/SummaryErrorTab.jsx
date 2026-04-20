export default function SummaryErrorTab({
  errorCodes,
  id,
  currentError,
  setCurrentError,
  classes,
}) {
  const errors = [...new Set(errorCodes)];
  const { errorTab, errorBase, errorOpen, errorClose } = classes.summary;

  return (
    <div className={errorTab}>
      {errors.map((error) => (
        <div
          key={`${id}${error}}`}
          onClick={() => setCurrentError(error)}
          className={`${errorBase}${error} ${currentError === error ? errorOpen : errorClose}`}
        ></div>
      ))}
      <div></div>
    </div>
  );
}
