import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import ContractSwitch from "./ContractSwitch";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function TeacherContract({ props, contractProps }) {
  const { strings, classes, toggle } = props;
  const { dataContracts, setDataContracts } = contractProps;
  const [isComplete, setIsComplete] = useState(false);

  // This configuration object is passed down to the wizard form (DispatchContractForm).
  // When a new teacher configures their prices for the first time, the form uses this config
  // to refresh the parent's data from the database. This updates the screen instantly
  // without requiring a manual page reload.

  const retrieveConfig = {
    data: { retrieve: "contract" },
    setter: setDataContracts,
    key: "contract",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  useEffect(() => {
    if (dataContracts && dataContracts.isComplete) setIsComplete(true);
  }, [dataContracts]);

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
          contractRetrieve={retrieveConfig}
        />
      )}
    </>
  );
}
