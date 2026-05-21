export default function TableCell({ row }) {
  const data = row.text;

  return (
    <div className="lesson__cell-single">
      {Array.isArray(data)
        ? data.map((text, index) => (
            <p className="lesson__cell-array" key={`textMap${index}`}>
              {text}
            </p>
          ))
        : data}
    </div>
  );
}
