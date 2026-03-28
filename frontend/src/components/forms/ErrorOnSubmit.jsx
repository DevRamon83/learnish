export default function ErrorOnSubmit({ error }) {
  return <>{error && <div>{error}</div>}</>;
}
