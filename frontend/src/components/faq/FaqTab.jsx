export default function FaqTab({ setAnswer, setAccount, account, classes }) {
  const handler = (tab) => {
    setAnswer(null);
    setAccount(tab);
  };

  const { faqTabBtnActive, faqTabBtn } = classes;
  return (
    <div className={classes.faqTab}>
      <div
        className={account === "students" ? faqTabBtnActive : faqTabBtn}
        onClick={() => handler("students")}
      >
        student
      </div>
      <div
        className={account === "teachers" ? faqTabBtnActive : faqTabBtn}
        onClick={() => handler("teachers")}
      >
        teacher
      </div>
    </div>
  );
}
