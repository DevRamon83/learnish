import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import DispatchContractForm from "./DispatchContractForm";
import ContractSwitch from "./ContractSwitch";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function TeacherContract({ props, contractProps }) {
  const { strings, classes, toggle } = props;
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

  const { form } = classes.settings;

  return (
    <>
      <SettingsCommonTitle
        classes={classes}
        string={strings.contractTitle}
        src="/prices.jpeg"
      />

      {toggle && (
        <ContractSwitch
          props={props}
          contractProps={contractProps}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
        />
      )}
    </>
  );
}
