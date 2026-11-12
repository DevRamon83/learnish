export default function ClassroomManagerBtnsContainer({
  classes,
  enrollmentHandler,
  strings,
  addStudent,
}) {
  return (
    <div className={classes.btnsContainer}>
      <button onClick={addStudent}>
        <img className={classes.save} src="/solution.svg" />
      </button>
      <p>{strings.info}</p>
      <button onClick={() => enrollmentHandler(null, "-close")}>
        <img className={classes.closeManager} src="/closeWhite.svg" />
      </button>
    </div>
  );
}
