export default function ChangeTeacherMenu({
  navigationHandler,
  setChangeTeacher,
  strings,
  previous,
  next,
  classes,
}) {
  return (
    <div className={classes.teacherMenu}>
      <div className={classes.prev} onClick={() => navigationHandler("back")}>
        {previous}
      </div>
      <div className={classes.close} onClick={() => setChangeTeacher(false)}>
        {strings.close}
      </div>
      <div className={classes.next} onClick={() => navigationHandler("next")}>
        {next}
      </div>
    </div>
  );
}
