import { useState } from "react";
import StudentsPrice from "../components/price/StudentsPrice";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import { classes } from "../constants/pages/price";
import TeachersPrice from "../components/price/TeachersPrice";

export default function Price() {
  const [account, setAccount] = useState("students");
  const { strings, lang } = useLang(i18nAddresses.price);

  return (
    <div className={classes.main}>
      <div className={classes.tabMenu}>
        <div
          className={
            account === "students" ? classes.tabActive : classes.tabBtn
          }
          onClick={() => setAccount("students")}
        >
          Studenti
        </div>
        <div
          className={
            account === "teachers" ? classes.tabActive : classes.tabBtn
          }
          onClick={() => setAccount("teachers")}
        >
          Insegnanti
        </div>
      </div>
      {account === "students" ? (
        <StudentsPrice strings={strings} classes={classes} />
      ) : (
        <TeachersPrice strings={strings} classes={classes} />
      )}
    </div>
  );
}
