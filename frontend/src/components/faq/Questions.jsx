import QuestionBtn from "../../ui/buttons/QuestionBtn";

export default function Questions({ strings, account, answer, setAnswer }) {
  return (
    <>
      {strings.map((qAndAobj, index) => (
        <div className="faq__question" key={`${account}-${index}`}>
          <QuestionBtn
            setAnswer={setAnswer}
            answer={answer}
            index={index}
            question={qAndAobj.question}
          />
          {index === answer && (
            <div className="faq__answer">{qAndAobj.answer}</div>
          )}
        </div>
      ))}
    </>
  );
}
