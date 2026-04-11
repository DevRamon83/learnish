import { classes } from "../constants/layout/dashboard";
import SummaryError from "./SummaryError";

export default function ShowSummary({
  parse,
  isInvalid,
  data,
  toggle,
  tooltipHandler,
}) {
  return (
    <>
      {parse.length !== 0 && !isInvalid && (
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
      )}
    </>
  );
}
