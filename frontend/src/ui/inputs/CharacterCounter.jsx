export default function CharacterCounter({ label, value, maxChars }) {
  return (
    <div className="">
      <span>{label}</span> <br />
      <span>
        {value} / {maxChars}
      </span>
    </div>
  );
}
