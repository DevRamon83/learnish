export default function SummaryError({ node, data, tooltipHandler, toggle }) {
  return (
    <span
      className={
        toggle === node.delCounter ? "summary__correction" : "summary__error"
      }
      onClick={() => tooltipHandler(node.delCounter)}
    >
      {toggle === node.delCounter
        ? data.mistakes[node.delCounter].correction
        : node.text}
    </span>
  );
}
