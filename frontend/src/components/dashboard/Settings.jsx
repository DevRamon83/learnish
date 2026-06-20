import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import Pic from "./settings/Pic";
import Plan from "./settings/Plan";
import Email from "./settings/Email";
import Password from "./settings/Password";
import MyTeacher from "./settings/MyTeacher";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import TeacherContract from "./settings/TeacherContract";
import Currency from "./settings/Currency";
import { useState } from "react";
import SettingError from "./settings/SettingError";
import { classes } from "../../constants/components/dashboard";
import TeachersList from "./settings/TeachersList";

export default function Settings({ userType }) {
  const user = useSelector((state) => state.auth.user);
  const { lang, strings } = useLang(i18nAddresses.settings);
  const [error, setError] = useState(null);
  const [changeTeacher, setChangeTeacher] = useState(false);

  const [userCurrency, setUserCurrency] = useState("");

  return (
    <div className={classes.settings.main}>
      <Pic strings={strings} user={user} />
      <Plan strings={strings} user={user} />
      <Email strings={strings} />
      <Password strings={strings} />
      {userType === "student" && (
        <>
          <MyTeacher
            strings={strings}
            changeTeacher={changeTeacher}
            setChangeTeacher={setChangeTeacher}
          />

          {changeTeacher && (
            <TeachersList
              classes={classes.settings}
              strings={strings}
              setChangeTeacher={setChangeTeacher}
            />
          )}
        </>
      )}

      {userType === "teacher" && (
        <>
          <Currency
            userCurrency={userCurrency}
            setUserCurrency={setUserCurrency}
            strings={strings}
            user={user}
          />
          <TeacherContract
            strings={strings}
            lang={lang}
            userCurrency={userCurrency}
            setError={setError}
          />
        </>
      )}
      {error && <SettingError classes={classes.settings} error={error} />}
    </div>
  );
}
