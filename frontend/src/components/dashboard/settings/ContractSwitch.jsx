import ContractPanel from "./ContractPanel";
import DispatchContractForm from "./DispatchContractForm";

export default function ContractSwitch({
  props,
  isComplete,
  setIsComplete,
  contractProps,
}) {
  const { strings, lang } = props;

  return (
    <>
      {!isComplete ? (
        <DispatchContractForm
          strings={strings}
          lang={lang}
          setIsComplete={setIsComplete}
        />
      ) : (
        <ContractPanel props={props} contractProps={contractProps} />
      )}
    </>
  );
}
