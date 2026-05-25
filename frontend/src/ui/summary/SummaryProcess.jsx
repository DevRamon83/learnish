import { classes } from "../../constants/components/dashboard";
import SummaryFailed from "./SummaryFailed";
import SummarySuccess from "./SummarySuccess";

export default function SummaryProcess({
  step,
  status,
  label,
  bar,
  setters,
  strings,
  value,
}) {
  const { setUploadStatus, setRetry, setUploadStep } = setters;

  const retryHandler = () => {
    setUploadStatus((prev) => ({ ...prev, [value]: null }));
    const newStep = value === "draft" ? true : null;
    setUploadStep((prev) => ({ ...prev, [value]: newStep }));
    setRetry((prev) => prev + 1);
  };

  return (
    <div className={classes.summary.processSpace}>
      {status === "failed" || status === "unavailable" ? (
        <SummaryFailed
          classes={classes}
          status={status}
          strings={strings}
          retryHandler={retryHandler}
        />
      ) : (
        <SummarySuccess
          classes={classes}
          status={status}
          step={step}
          bar={bar}
          label={label}
        />
      )}
    </div>
  );
}
