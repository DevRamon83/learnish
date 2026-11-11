export default function Spinner({ size = "md", variant = "primary" }) {
  return (
    <div
      role="status"
      className={`spinner spinner--${size} spinner--${variant}`}
    />
  );
}
