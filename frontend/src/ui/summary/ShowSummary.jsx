import { useSelector } from "react-redux";
import { classes } from "../../constants/components/dashboard";
import ShowSummaryDetails from "./ShowSummaryDetails";
import SummaryError from "./SummaryError";

export default function ShowSummary({
  parse,
  isInvalid,
  data,
  toggle,
  tooltipHandler,
}) {
  const stats = useSelector((state) => state.stats);

  return (
    <div className={classes.summary.readPanel}>
      {parse.length !== 0 && !isInvalid && (
        <div className={classes.summary.textContainer}>
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
    </div>
  );
}
