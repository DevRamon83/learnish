import Deactivate from "../../components/dashboard/settings/Deactivate";

const showHandler = (card, dataContracts, contract) => {
  if (card !== "Contracts") return true;
  if (!dataContracts?.isComplete) return false;
  if (contract === "subscription") return true;
  return dataContracts ? dataContracts[contract].available : false;
};

export default function SettingsMenu({ props, contractProps }) {
  const { toggle, setToggle, classes, card, setError } = props;

  const { nextHandler, currentContract, contracts, exist, dataContracts } =
    contractProps;
  const formId = `settings__${card}${card === "Contracts" ? `__${contracts[currentContract]}` : ""}`;
  const contract = contracts[currentContract];
  const toggleClass = toggle
    ? classes.settings.btnClose
    : classes.settings.btnChange;

  const show = showHandler(card, dataContracts, contract);

  return (
    <div className={classes.settings.menu}>
      <div onClick={() => setToggle(!toggle)} className={toggleClass}></div>
      {toggle && show && (
        <button
          className={classes.settings.btnFetch}
          type="submit"
          form={formId}
        />
      )}

      {card === "Contracts" && toggle && dataContracts && (
        <>
          {contract !== "subscription" && exist && (
            <Deactivate props={props} contractProps={contractProps} />
          )}
          <div className={classes.settings.next} onClick={nextHandler} />
        </>
      )}
    </div>
  );
}
