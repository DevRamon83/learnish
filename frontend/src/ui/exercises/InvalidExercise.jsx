export default function InvalidExercise({ strings, error }) {
  return (
    <>
      <div>{strings[error]}</div>
    </>
  );
}
