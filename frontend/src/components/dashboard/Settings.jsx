import { useSelector } from "react-redux";
import Pic from "./settings/Pic";
import Plan from "./settings/Plan";
import Email from "./settings/Email";
import Password from "./settings/Password";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import TeacherContract from "./settings/TeacherContract";
import Currency from "./settings/Currency";
import { useState } from "react";
import SettingError from "./settings/SettingError";
import { classes } from "../../constants/components/dashboard";
import SettingsStudent from "./SettingsStudent";
import getPicUrl from "../../helpers/getPicUrl";
import getCardSettings from "../../helpers/getCardSettings";

export default function Settings({ userType }) {
  const user = useSelector((state) => state.auth.user);
  const { lang, strings } = useLang(i18nAddresses.settings);
  const [error, setError] = useState(null);
  const [userCurrency, setUserCurrency] = useState("");
  const [card, setCard] = useState("Pic");

  const [myTeacher, setMyTeacher] = useState(null);
  const teacher = {
    profilePic: {
      storage: "supabase",
      bucketImg: "users",
      fileName: `avatar_${myTeacher?.id}.webp`,
    },
  };

  const url = getPicUrl(teacher);
  const teacherObj = {
    id: myTeacher?.id,
    username: myTeacher?.username,
    url,
    setter: setMyTeacher,
    state: myTeacher || null,
  };

  const [teachersList, setTeachersList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const userCards = getCardSettings(userType);

  const cardHandler = (nextCard) => {
    setCard(nextCard);
    setToggle(false);
  };

  const [userPic, setUserPic] = useState({
    url: getPicUrl(user),
  });

  const props = {
    card,
    setCard,
    strings,
    classes,
    cardHandler,
    user,
    setError,
    toggle,
    setToggle,
    userPic,
    setUserPic,
    myTeacher,
    setMyTeacher,
    teachersList,
    setTeachersList,
    teacherObj,
    userCards,
    setUserCurrency,
  };

  return (
    <div className={classes.settings.main}>
      {card === "Pic" && <Pic props={props} />}
      {card === "Email" && <Email props={props} />}
      {card === "Password" && <Password props={props} />}
      {card === "Plan" && <Plan props={props} userType={userType} />}
      {card === "MyTeacher" && userType === "student" && (
        <SettingsStudent props={props} />
      )}

      {userType === "teacher" && (
        <>
          {card === "Currency" && <Currency props={props} />}

          {card === "Contracts" && <TeacherContract props={props} />}
        </>
      )}

      {error && <SettingError classes={classes.settings} error={error} />}
    </div>
  );
}
