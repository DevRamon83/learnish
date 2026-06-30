import ContractPanel from "./ContractPanel";
import DispatchContractForm from "./DispatchContractForm";
import { servicesMap } from "../../../constants/components/dashboard";
import { useEffect, useState } from "react";
import bundle from "shared";
const { contracts } = bundle.constants;

export default function ContractSwitch({ props, isComplete, setIsComplete }) {
  const { strings, lang } = props;
  const servicesKeys = Object.keys(servicesMap);
  const [currentContract, setCurrentContract] = useState(0);
  const [config, setConfig] = useState(0);

  useEffect(() => {
    if (currentContract >= contracts.length - 1) {
      setCurrentContract(0);
    }

    setConfig(servicesMap[contracts[currentContract]]);
  }, [currentContract]);

  return (
    <>
      {!isComplete ? (
        <DispatchContractForm
          strings={strings}
          lang={lang}
          setIsComplete={setIsComplete}
        />
      ) : (
        <ContractPanel
          config={config}
          currentContract={currentContract}
          setCurrentContract={setCurrentContract}
          contracts={contracts}
          props={props}
        />
      )}
    </>
  );
}
