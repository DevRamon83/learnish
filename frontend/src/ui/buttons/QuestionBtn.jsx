export default function QuestionBtn({
  answer,
  setAnswer,
  index,
  question,
  classes,
}) {
  const { questionButton, textActive, text, arrow } = classes;
  return (
    <button className={questionButton} onClick={() => setAnswer(index)}>
      <div className={answer === index ? textActive : text}>{question}</div>
      <div className={arrow}>
        <img src="/arrow.svg" />
      </div>
    </button>
  );
}
