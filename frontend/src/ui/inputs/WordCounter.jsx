export default function WordCounter({ label, value, maxChars }) {
  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  return (
    <div className="">
      <span>{label}</span> <br />
      <span>
        {wordCount} / {maxChars}
      </span>
    </div>
  );
}
