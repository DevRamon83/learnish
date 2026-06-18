export default function CloseSettingsBtn({ state, setter, classes, setError }) {
  const handler = () => {
    setter(!state);
    setError(null);
  };
  return (
    <>
      {state && (
        <div onClick={handler} className={classes.btnClose}>
          <img src="/close.svg" />
        </div>
      )}
    </>
  );
}
