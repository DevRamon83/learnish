import QuestionBtn from "../../ui/buttons/QuestionBtn";

export default function Questions({
  questions,
  account,
  answer,
  setAnswer,
  strings,
}) {
  const accountAnswers = strings.answers[account];
  const commons = strings.answers.commons;
  const answers = [...accountAnswers, ...commons];
  return (
    <>
      {questions.map((question, index) => (
        <div className="faq__question" key={`${account}-${index}`}>
          <QuestionBtn
            setAnswer={setAnswer}
            answer={answer}
            index={index}
            question={question}
          />
          {index === answer && (
            <div className="faq__answer">{answers[index]}</div>
          )}
        </div>
      ))}
    </>
  );
}
