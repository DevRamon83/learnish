import ClassroomBadge from "./ClassroomBadge";

export default function ClassroomBadgeContainer({
  classes,
  animals,
  enrollmentHandler,
  currentClassroom,
  classrooms,
  badgeBtn,
  toggleBadgePanel,
}) {
  return (
    <div className={classes.badgeContainer}>
      {/* Formal key to satisfy React's list rule; 
        actual DOM elements inside ClassroomBadge use unique color-animal keys. */}
      {animals.map((animal, index) => (
        <ClassroomBadge
          key={`${animal}_${index}`}
          animal={animal}
          colors={classrooms[animal]}
          enrollmentHandler={enrollmentHandler}
          currentClassroom={currentClassroom}
          classes={classes}
          pointer={true}
        />
      ))}
      <button onClick={toggleBadgePanel}>
        <img className={`${classes.badge}-btns`} src={`/${badgeBtn}.svg`} />
      </button>
    </div>
  );
}
