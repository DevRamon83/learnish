export default function ClassroomSelection({
  array,
  action,
  icon,
  studentHandler,
  classes,
}) {
  return (
    <div className={classes.multipleChoice}>
      {array.map((username) => (
        <div
          className={classes.row}
          onClick={() => studentHandler(username, action)}
          key={`selected_${username}`}
        >
          {username}
          <img src={`/${icon}.svg`} />
        </div>
      ))}
    </div>
  );
}
