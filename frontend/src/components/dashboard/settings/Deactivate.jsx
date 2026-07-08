import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";
import DeactivatePanel from "./DeactivatePanel";

export default function Deactivate({ contractProps, props }) {
  const { strings, classes } = props;
  const {
    currentContract,
    contracts,
    setExist,
    setDataContracts,
    deactivate,
    setDeactivate,
  } = contractProps;
  const contract = contracts[currentContract];

  const deactivateHandler = () => {
    setDeactivate(true);
  };

  return (
    <>
      {!deactivate && (
        <div className={classes.settings.trash} onClick={deactivateHandler} />
      )}
    </>
  );
}
