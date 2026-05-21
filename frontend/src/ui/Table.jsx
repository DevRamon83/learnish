import TableCell from "./TableCell";

export default function Table({ data }) {
  const containerClass = `lesson__table-${data.containerClass}`;
  const rows = data.rows;
  return (
    <>
      <div className={containerClass}>
        {rows.map((row, index) => (
          <div key={`row${index}`} className="lesson__cell">
            {row.double ? (
              <div className="lesson__cell-double">
                <div className="lesson__cell-mother">{row.ita}</div>
                <div className="lesson__cell-target">{row.eng}</div>
              </div>
            ) : (
              <TableCell row={row} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
