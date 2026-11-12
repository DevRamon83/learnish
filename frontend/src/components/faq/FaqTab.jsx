export default function FaqTab({ setAnswer, setAccount, account, classes }) {
  const handler = (tab) => {
    setAnswer(null);
    setAccount(tab);
  };

  const { faqTabBtnActive, faqTabBtn } = classes;
  return (
    <div className={classes.faqTab}>
      <button
        className={account === "students" ? faqTabBtnActive : faqTabBtn}
        onClick={() => handler("students")}
      >
        student
      </button>
      <button
        className={account === "teachers" ? faqTabBtnActive : faqTabBtn}
        onClick={() => handler("teachers")}
      >
        teacher
      </button>
    </div>
  );
}
