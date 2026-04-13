export default function FaqTab({ setAnswer, setAccount, account }) {
  const handler = (tab) => {
    setAnswer(null);
    setAccount(tab);
  };
  return (
    <div className="faq__tab">
      <div
        className={
          account === "students" ? "faq__tabBtn-active" : "faq__tabBtn"
        }
        onClick={() => handler("students")}
      >
        student
      </div>
      <div
        className={
          account === "teachers" ? "faq__tabBtn-active" : "faq__tabBtn"
        }
        onClick={() => handler("teachers")}
      >
        teacher
      </div>
    </div>
  );
}
