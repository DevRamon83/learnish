import SummaryActionContainer from "./SummaryActionContainer";

export default function SummaryAction({
  status,
  actionHandler,
  closeAlert,
  classes,
  strings,
}) {
  const { actions } = strings;
  return (
    <>
      {status && (
        <div className={classes.summary.action}>
          {status === "draft" && (
            <SummaryActionContainer
              label={actions.actionCorrection}
              classes={classes}
              actionHandler={actionHandler}
              closeAlert={closeAlert}
              action={actions.correction}
              close={actions.close}
              handlerParam={"correction"}
            />
          )}
          {status === "misalignment" && (
            <SummaryActionContainer
              label={actions.actionStats}
              classes={classes}
              actionHandler={actionHandler}
              closeAlert={closeAlert}
              action={actions.stats}
              close={actions.close}
              handlerParam={"stats"}
            />
          )}
        </div>
      )}
    </>
  );
}
