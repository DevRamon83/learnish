import { bars, classes } from "../constants/layout/dashboard";
import SummaryProcess from "./SummaryProcess";

export default function SummaryUpload({ states, setters, strings }) {
  const { step, status } = states;
  const { setUploadStatus, setRetry } = setters;

  const retryHandler = () => {
    setUploadStatus(null);
    setRetry((prev) => prev + 1);
  };

  return (
    <div className={classes.summary.processUpload}>
      {bars.map((key) => (
        <div key={`${key}process`}>
          <SummaryProcess
            step={step[key]}
            status={status[key]}
            label={`${strings.process[key]}`}
            bar={`${classes.summary.base}${key}`}
          />
        </div>
      ))}

      {status === "failed" && (
        <button onClick={retryHandler}>{strings.retry}</button>
      )}
    </div>
  );
}
