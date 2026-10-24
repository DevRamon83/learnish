export default function ExerciseCards({
  exercises,
  classes,
  handler,
  strings,
}) {
  return (
    <>
      {exercises.map((exercise) => (
        <div
          className={classes.exerciseCard}
          key={`exerciseTab_${exercise}`}
          onClick={() => handler(exercise)}
        >
          <img
            src={`/${exercise}.jpg`}
            alt={strings[exercise]}
            title={strings[exercise]}
            className={classes.exerciseCardImg}
          />
          <div className={classes.exerciseCardText}>
            <div> {strings[exercise]}</div>
            <img src={`/arrow.svg`} alt="arrow" title="arrow" />
          </div>
        </div>
      ))}
    </>
  );
}
