import { classes } from "../../constants/components/dashboard";

export default function SummaryError({ node, data, tooltipHandler, toggle }) {
  const { summary } = classes;

  return (
    <span
      className={
        toggle === node.delCounter ? summary.correctionSpan : summary.errorSpan
      }
      onClick={() => tooltipHandler(node.delCounter)}
    >
      {toggle === node.delCounter
        ? data.mistakes[node.delCounter].correction
        : node.text}
    </span>
  );
}
