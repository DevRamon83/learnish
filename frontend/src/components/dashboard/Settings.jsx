import { useSelector } from "react-redux";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import TeacherContract from "./settings/TeacherContract";
import { useState } from "react";
import SettingError from "./settings/SettingError";
import { classes } from "../../constants/components/dashboard";
import SettingsStudent from "../../ui/settings/SettingsStudent";
import getPicUrl from "../../helpers/getPicUrl";
import getCardSettings from "../../helpers/getCardSettings";
import SettingsMenu from "../../ui/settings/SettingsMenu";
import Breadcrumb from "./settings/Breadcrumb";
import DeactivatePanel from "./settings/DeactivatePanel";
import SettingsTeacher from "../../ui/settings/SettingsTeacher";
import SettingsCommon from "../../ui/settings/SettingsCommon";
import bundle from "shared";
const { contracts } = bundle.constants;

export default function Settings({ userType }) {
  const user = useSelector((state) => state.auth.user);
  const { lang, strings } = useLang(i18nAddresses.settings);
  const [error, setError] = useState(null);
  const [dataContracts, setDataContracts] = useState(null);
  const [deactivate, setDeactivate] = useState(false);

  const [exist, setExist] = useState(false);
  // handle the current setting
  const [card, setCard] = useState("Pic");

  // if user is a teacher and the card is Contracts, this state handle
  // the service which the user are viewing
  const [currentContract, setCurrentContract] = useState(0);

  // it maybe can be move in the child component
  const [teachersList, setTeachersList] = useState([]);

  const [toggle, setToggle] = useState(false);

  const [myTeacher, setMyTeacher] = useState(null);

  const userCards = getCardSettings(userType);

  const [userPic, setUserPic] = useState({
    url: getPicUrl(user),
  });

  // if user is a teacher this allow navigation between contracts
  const nextHandler = () => {
    const resetCurrentContract = currentContract === contracts.length - 1;

    if (resetCurrentContract) {
      setCurrentContract(0);
    } else {
      setCurrentContract((prev) => prev + 1);
    }
    setError(null);
  };

  const props = {
    card,
    setCard,
    strings,
    classes,
    setError,
    toggle,
    setToggle,
    userCards,
  };

  const planProps = { user };
  const picProps = { user, userPic, setUserPic };

  const contractProps = {
    nextHandler,
    setCurrentContract,
    contracts,
    currentContract,
    dataContracts,
    setDataContracts,
    exist,
    setExist,
    deactivate,
    setDeactivate,
  };

  const studentProps = {
    teachersList,
    setTeachersList,
    setMyTeacher,
    myTeacher,
  };

  return (
    <div className={classes.settings.main}>
      <div className={classes.settings.container}>
        <SettingsCommon
          props={props}
          picProps={picProps}
          planProps={planProps}
        />

        <SettingsStudent props={props} studentProps={studentProps} />
        <SettingsTeacher props={props} contractProps={contractProps} />
        <SettingsMenu props={props} contractProps={contractProps} />
        <Breadcrumb props={props} />

        {error && <SettingError classes={classes.settings} error={error} />}

        {deactivate && (
          <DeactivatePanel props={props} contractProps={contractProps} />
        )}
      </div>
    </div>
  );
}
