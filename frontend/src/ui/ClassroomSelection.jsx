export default function ClassroomSelection({
  array,
  action,
  icon,
  studentHandler,
  classes,
  strings,
}) {
  return (
    <div className={classes.multipleChoice}>
      {array.map((username) => (
        <button
          className={classes.row}
          onClick={() => studentHandler(username, action)}
          key={`selected_${username}`}
        >
          {username}
          <img src={`/${icon}.svg`} />
        </button>
      ))}
      {action === "add" && array.length === 0 && (
        <div className={classes.row}>{strings.zeroAvailable}</div>
      )}
    </div>
  );
}
