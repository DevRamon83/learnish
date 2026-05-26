import { classes } from "../constants/components/dashboard";

export default function TableCell({ row }) {
  const data = row.text;

  return (
    <div className={classes.lessons.singleCell}>
      {Array.isArray(data)
        ? data.map((text, index) => (
            <p className={classes.lessons.cellArray} key={`textMap${index}`}>
              {text}
            </p>
          ))
        : data}
    </div>
  );
}
