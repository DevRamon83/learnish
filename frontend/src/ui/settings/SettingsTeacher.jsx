import { useState } from "react";
import Currency from "../../components/dashboard/settings/Currency";
import TeacherContract from "../../components/dashboard/settings/TeacherContract";
import SettingsMenu from "./SettingsMenu";
import DeactivatePanel from "../../components/dashboard/settings/DeactivatePanel";
import bundle from "shared";
const { contracts } = bundle.constants;

export default function SettingsTeacher({ sharedProps }) {
  const { card, setError } = sharedProps;
  const [currentContract, setCurrentContract] = useState(0);
  const [exist, setExist] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [dataContracts, setDataContracts] = useState(null);

  const nextHandler = () => {
    const resetCurrentContract = currentContract === contracts.length - 1;

    if (resetCurrentContract) {
      setCurrentContract(0);
    } else {
      setCurrentContract((prev) => prev + 1);
    }
    setError(null);
  };

  const contractProps = {
    currentContract,
    setCurrentContract,
    dataContracts,
    setDataContracts,
  };

  return (
    <>
      <SettingsMenu
        exist={exist}
        sharedProps={sharedProps}
        nextHandler={nextHandler}
        deactivate={deactivate}
        setDeactivate={setDeactivate}
        contractProps={contractProps}
      />

      {card === "Currency" && <Currency sharedProps={sharedProps} />}

      {card === "Contracts" && (
        <TeacherContract
          sharedProps={sharedProps}
          exist={exist}
          setExist={setExist}
          nextHandler={nextHandler}
          contractProps={contractProps}
        />
      )}

      {deactivate && (
        <DeactivatePanel
          sharedProps={sharedProps}
          setDeactivate={setDeactivate}
          setExist={setExist}
          contractProps={contractProps}
        />
      )}
    </>
  );
}
