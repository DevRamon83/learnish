export default function SettingsDataContainer({ type, data, containerClass }) {
  return (
    <div className={containerClass}>
      {type === "img" ? <img src={data} /> : <p>{data}</p>}
    </div>
  );
}
