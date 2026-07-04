import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import DispatchContractForm from "./DispatchContractForm";
import ContractPanel from "./ContractPanel";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import ContractSwitch from "./ContractSwitch";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function TeacherContract({ props }) {
  const { strings, lang, userCurrency, setError, classes, toggle, setToggle } =
    props;
  const [contract, setContract] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const retrieveConfig = {
    data: { retrieve: "contract" },
    setter: setContract,
    key: "contract",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  useEffect(() => {
    if (contract && contract.isComplete) setIsComplete(true);
  }, [isComplete, contract]);

  const { container, form } = classes.settings;

  return (
    <>
      <div className={container}>
        <SettingsCommonTitle
          classes={classes}
          string={strings.contractTitle}
          src="/prices.jpeg"
        />

        {toggle && (
          <ContractSwitch
            props={props}
            isComplete={isComplete}
            setIsComplete={setIsComplete}
          />
        )}

        <SettingsButtonContainer
          toggle={toggle}
          setToggle={setToggle}
          classes={classes}
        />

        <SettingsBreadcrumb props={props} />
      </div>
    </>
  );
}
