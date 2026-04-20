import { classes } from "../constants/layout/dashboard";
import ShowSummaryDetails from "./ShowSummaryDetails";
import SummaryError from "./SummaryError";

export default function ShowSummary({
  parse,
  isInvalid,
  data,
  toggle,
  tooltipHandler,
}) {
  return (
    <div className="summary__read-panel">
      {parse.length !== 0 && !isInvalid && (
        <div className="summary__text-container">
          <p className={classes.container}>
            {parse.map((node) =>
              node.type === "span" ? (
                <span key={node.id}>{node.text}</span>
              ) : (
                <SummaryError
                  key={node.id}
                  node={node}
                  data={data}
                  toggle={toggle}
                  tooltipHandler={tooltipHandler}
                />
              ),
            )}
          </p>
        </div>
      )}
      <ShowSummaryDetails data={data} />
    </div>
  );
}
