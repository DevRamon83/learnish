export default function CloseSettingsBtn({ state, setter, classes }) {
  return (
    <>
      {state && (
        <div onClick={() => setter(!state)} className={classes.btnClose}>
          <img src="/close.svg" />
        </div>
      )}
    </>
  );
}
