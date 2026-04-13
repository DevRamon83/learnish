export default function QuestionBtn({ answer, setAnswer, index, question }) {
  return (
    <div className="faq__question-btn" onClick={() => setAnswer(index)}>
      <div
        className={
          answer === index ? "faq__question-textActive" : "faq__question-text"
        }
      >
        {question}
      </div>
      <div className="faq__question-arrow">
        <img src="/arrow.svg" />
      </div>
    </div>
  );
}
