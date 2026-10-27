export default function MultipleChoice({ setExercise, strings, setError }) {
  const handler = (e) => {
    setExercise((prev) => ({
      ...prev,
      multipleWrongs: e.target.value,
    }));
  };
  return (
    <>
      <h3>{strings.multipleChoiceHeader}</h3>
      <p>{strings.multipleChoiceExample}</p>
      <input
        onFocus={() => setError(null)}
        onBlur={handler}
        size="100"
        type="text"
      />
    </>
  );
}
