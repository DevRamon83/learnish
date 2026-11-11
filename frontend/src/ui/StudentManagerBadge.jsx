export default function StudentManagerBadge({
  currentStudent,
  badge,
  color,
  animal,
  strings,
}) {
  return (
    <>
      {currentStudent &&
        (color ? (
          <div className={`${badge} ${`${badge}-${color}`}`}>
            <img src={`/badges/${animal}.svg`} />{" "}
          </div>
        ) : (
          strings.studentManager.noClassroom
        ))}
    </>
  );
}
