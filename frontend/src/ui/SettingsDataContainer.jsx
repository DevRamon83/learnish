export default function SettingsDataContainer({ type, data, classes }) {
  return (
    <div className={classes.dataContainer}>
      {type === "img" ? <img src={data} /> : <p>{data}</p>}
    </div>
  );
}
