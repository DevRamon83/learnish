import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import DispatchContractForm from "./DispatchContractForm";
import ContractPanel from "./ContractPanel";
import { servicesMap } from "../../../constants/components/dashboard";

export default function TeacherContract({
  strings,
  lang,
  userCurrency,
  setError,
}) {
  const [contract, setContract] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const retrieveConfig = {
    data: { retrieve: "contract" },
    setter: setContract,
    key: "contract",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const servicesKeys = Object.keys(servicesMap);

  useEffect(() => {
    if (contract && contract.isComplete) setIsComplete(true);
  }, [isComplete, contract]);

  return (
    <>
      {!isComplete ? (
        <DispatchContractForm
          strings={strings}
          lang={lang}
          setIsComplete={setIsComplete}
        />
      ) : (
        <>
          {servicesKeys.map((key) => (
            <ContractPanel
              key={`contract${key}`}
              config={servicesMap[key]}
              strings={strings}
              lang={lang}
              userCurrency={userCurrency}
              contract={key}
              setError={setError}
            />
          ))}
        </>
      )}
    </>
  );
}
