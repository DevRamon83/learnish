import { useSelector } from "react-redux";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useState } from "react";
import SettingError from "./settings/SettingError";
import { classes } from "../../constants/components/dashboard";
import SettingsStudent from "../../ui/settings/SettingsStudent";
import getPicUrl from "../../helpers/getPicUrl";
import getCardSettings from "../../helpers/getCardSettings";
import SettingsMenu from "../../ui/settings/SettingsMenu";
import DeactivatePanel from "./settings/DeactivatePanel";
import SettingsTeacher from "../../ui/settings/SettingsTeacher";
import SettingsCommon from "../../ui/settings/SettingsCommon";
import bundle from "shared";
import Breadcrumb from "../../ui/settings/Breadcrumb";
const { contracts } = bundle.constants;

/**
 * ARCHITECTURE NOTE: Centralized State Management & Component Polymorphism
 *
 * This main dashboard acts as a central orchestrator for both Student and Teacher settings.
 * To strictly respect the DRY (Don't Repeat Yourself) principle and maintain a unified,
 * non-redundant layout container, states for all sub-views are hosted here.
 *
 * 1. Intentional Prop Drilling: States are bundled into macro-objects
 *    (props, contractProps, studentProps) and passed down to specialized sub-routers
 *    (SettingsCommon, SettingsStudent, SettingsTeacher). This avoids code duplication
 *     and allows children to trigger state changes up to the parent.
 *
 * 2. State Machine Wizard: Complex, multi-step sequential workflows
 *    (such as the Teacher Contract wizard) rely on these centralized states to
 *    handle isolated, step-by-step API saves safely.
 */

export default function Settings({ userType }) {
  const user = useSelector((state) => state.auth.user);
  const { strings } = useLang(i18nAddresses.settings);
  const [error, setError] = useState(null);
  const [dataContracts, setDataContracts] = useState(null);
  const [deactivate, setDeactivate] = useState(false);

  const [exist, setExist] = useState(false);
  // handle the current setting
  const [card, setCard] = useState("Pic");

  // if user is a teacher and the card is Contracts, this state handle
  // the service which the user are viewing
  const [currentContract, setCurrentContract] = useState(0);

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
