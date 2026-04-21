import { bars, classes } from "../../constants/layout/dashboard";
import SummaryProcess from "./SummaryProcess";

export default function SummaryUpload({ states, setters, strings }) {
  const { step, status } = states;

  return (
    <div className={classes.summary.processUpload}>
      {bars.map((value) => (
        <div key={`${value}process`}>
          <SummaryProcess
            step={step[value]}
            status={status[value]}
            label={`${strings.process[value]}`}
            bar={`${classes.summary.base}${value}`}
            setters={setters}
            strings={strings}
            value={value}
          />
        </div>
      ))}
    </div>
  );
}
