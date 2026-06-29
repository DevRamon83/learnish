import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import DispatchContractForm from "./DispatchContractForm";
import ContractPanel from "./ContractPanel";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import ContractSwitch from "./ContractSwitch";

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

  const submitHandler = () => {
    console.log("ciao");
  };

  return (
    <>
      <div className={container}>
        <h3 className="settings__title">Prospetti dei costi e dei servizi</h3>
        <div className="settings__imgContainer">
          <img src={"/prices.jpeg"} />
        </div>

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
          submitHandler={submitHandler}
        />

        <SettingsBreadcrumb props={props} />
      </div>
    </>
  );
}
