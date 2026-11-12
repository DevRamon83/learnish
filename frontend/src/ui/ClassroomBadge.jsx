export default function ClassroomBadge({
  animal,
  colors,
  enrollmentHandler,
  currentClassroom,
  classes,
  pointer,
}) {
  const { badge, pointerClass } = classes;
  return (
    <>
      {colors.map((color) => {
        const key = `${color}-${animal}`;
        return (
          currentClassroom !== key && (
            <button
              key={key}
              onClick={() => enrollmentHandler(key, "-open")}
              className={`${badge} ${`${badge}-${color}`} ${pointer ? pointerClass : ""}`}
            >
              <img src={`/badges/${animal}.svg`} />{" "}
            </button>
          )
        );
      })}
    </>
  );
}
