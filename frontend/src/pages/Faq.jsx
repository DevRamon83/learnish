import { useState } from "react";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";
import FaqTab from "../components/faq/FaqTab";
import Questions from "../components/faq/Questions";

export default function Faq() {
  const { strings, lang } = useLang(i18nAddresses.faq);
  const { students, teachers, commons } = strings;
  const [account, setAccount] = useState("students");
  const [answer, setAnswer] = useState(null);
  const teachersStrings = [...teachers, ...commons];
  const studentsStrings = [...students, ...commons];

  return (
    <main className="faq">
      <div className="faq__question-section">
        <FaqTab
          setAnswer={setAnswer}
          setAccount={setAccount}
          account={account}
        />
        <Questions
          strings={account === "students" ? studentsStrings : teachersStrings}
          account={account}
          answer={answer}
          setAnswer={setAnswer}
        />
      </div>
    </main>
  );
}
