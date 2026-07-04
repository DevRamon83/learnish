export default function SettingsCommonTitle({ classes, string, src }) {
  return (
    <>
      <h3 className={classes.settings.title}>{string}</h3>
      <div className={classes.settings.imgContainer}>
        <img src={src} />
      </div>
    </>
  );
}
