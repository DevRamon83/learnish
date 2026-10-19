import DeactivateBtnContainer from "./DeactivateBtnContainer";

export default function TeacherDeactivateAlert({
  deactivatePanel,
  setDeactivatePanel,
  chooseTeacher,
  classes,
  strings,
}) {
  const handler = () => {
    setDeactivatePanel("deactivate");
    chooseTeacher();
  };
  return (
    <>
      {deactivatePanel === "open" && (
        <div className={classes.deactivatePanel}>
          {strings.change.deactivateAlertText}
          <DeactivateBtnContainer
            classes={classes}
            setDeactivatePanel={setDeactivatePanel}
            handler={handler}
            strings={strings}
          />
        </div>
      )}
    </>
  );
}
