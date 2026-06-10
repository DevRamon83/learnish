export default function SettingsBtn({ state, classes }) {
  return (
    <button
      className={state ? classes.btnFetch : classes.btnChange}
      type="submit"
    />
  );
}
