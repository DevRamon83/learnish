export default function ErrorOnSubmit({ error }) {
  return <>{error && <>{error}</>}</>;
}
