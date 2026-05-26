import TableCell from "./TableCell";
import { classes } from "../constants/components/dashboard";

export default function Table({ data }) {
  const containerClass = `${classes.lessons.table}-${data.containerClass}`;
  const rows = data.rows;
  const cellBase = classes.lessons.cellBase;
  return (
    <>
      <div className={containerClass}>
        {rows.map((row, index) => (
          <div key={`row${index}`} className={cellBase}>
            {row.double ? (
              <div className={`${cellBase}`}>
                <div className={`${cellBase}-mother`}>{row.ita}</div>
                <div className={`${cellBase}-target`}>{row.eng}</div>
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
