export default function TitleAndCloseBtn({ classes, closeHandler, text }) {
  return (
    <button className={classes.section}>
      {text}
      <img title="close" alt="close" src="/close.svg" onClick={closeHandler} />
    </button>
  );
}
