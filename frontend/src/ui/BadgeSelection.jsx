export default function BadgeSelection({
  title,
  setter,
  array,
  selectName,
  classes,
}) {
  return (
    <div className={classes.inputContainer}>
      <h3>{title}</h3>

      <select
        name={selectName}
        onChange={(e) => setter(e.target.value)}
        defaultValue={""}
      >
        <option value=""></option>
        {array.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
