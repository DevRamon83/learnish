export default function Level({ handler, level, classes, strings, value }) {
  const levelTag = `${level.toLowerCase()}Level`;

  return (
    <div onClick={() => handler(value, levelTag)} className={classes.larLevel}>
      <span>{level}</span> {strings.level}
      <img src={`/arrow.svg`} alt="arrow" title="arrow" />
    </div>
  );
}
