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

export default function Settings({ userType }) {
  const user = useSelector((state) => state.auth.user);
  const { lang, strings } = useLang(i18nAddresses.settings);

  return (
    <div className="settings__main">
      <Pic strings={strings} user={user} />
      <Plan strings={strings} user={user} />
      <Email strings={strings} />
      <Password strings={strings} />
      {userType === "student" && <MyTeacher strings={strings} />}
      {userType === "teacher" && (
        <>
          <Currency strings={strings} user={user} />
          <TeacherContract strings={strings} lang={lang} />
        </>
      )}
    </div>
  );
}
