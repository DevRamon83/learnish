import ContractPanel from "./ContractPanel";
import DispatchContractForm from "./DispatchContractForm";

/**
 * @param {boolean} isComplete - A database-level flag (default: false at signup).
 * It determines whether the teacher's profile is operational. Registration is considered
 * complete ONLY after the user has configured and submitted pricing for their services.
 */
export default function ContractSwitch({
  props,
  isComplete,
  setIsComplete,
  contractProps,
  contractRetrieve,
}) {
  const { strings, lang } = props;

  return (
    <>
      {!isComplete ? (
        <DispatchContractForm
          strings={strings}
          lang={lang}
          setIsComplete={setIsComplete}
          contractRetrieve={contractRetrieve}
        />
      ) : (
        <ContractPanel props={props} contractProps={contractProps} />
      )}
    </>
  );
}
