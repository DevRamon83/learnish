import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
import DispatchContractForm from "./DispatchContractForm";
import ContractPanel from "./ContractPanel";

export default function TeacherContract({
  sharedProps,
  exist,
  setExist,
  nextHandler,
  contractProps,
}) {
  const { strings, classes, toggle, lang, setError } = sharedProps;
  const { dataContracts, setDataContracts } = contractProps;

  // A database-level flag (default: false at signup), it determines whether
  // the teacher's profile is operational. Registration is considered complete ONLY
  // after the user has configured and submitted pricing for their services.
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

      {toggle &&
        (!isComplete ? (
          <>
            <DispatchContractForm
              strings={strings}
              lang={lang}
              setIsComplete={setIsComplete}
              retrieveConfig={retrieveConfig}
              setError={setError}
            />
          </>
        ) : (
          <ContractPanel
            sharedProps={sharedProps}
            exist={exist}
            setExist={setExist}
            nextHandler={nextHandler}
            contractProps={contractProps}
          />
        ))}
    </>
  );
}
