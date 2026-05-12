import QuestionBtn from "../../ui/buttons/QuestionBtn";

export default function Questions({
  strings,
  account,
  answer,
  setAnswer,
  classes,
}) {
  return (
    <>
      {strings.map((qAndAobj, index) => (
        <div className={classes.question} key={`${account}-${index}`}>
          <QuestionBtn
            setAnswer={setAnswer}
            answer={answer}
            index={index}
            question={qAndAobj.question}
            classes={classes}
          />
          {index === answer && (
            <div className={classes.answer}>{qAndAobj.answer}</div>
          )}
        </div>
      ))}
    </>
  );
}
