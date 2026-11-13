import bundle from "shared";
const { contracts } = bundle.constants;

const showHandler = (card, dataContracts, contract) => {
  if (card !== "Contracts") return true;
  if (!dataContracts?.isComplete) return false;
  if (contract === "subscription") return true;
  return dataContracts ? dataContracts[contract].available : false;
};

export default function SettingsMenu({
  sharedProps,
  exist,
  nextHandler,
  contractProps,
  deactivate,
  setDeactivate,
}) {
  const { toggle, setToggle, classes, card } = sharedProps;
  const { currentContract, dataContracts } = contractProps;

  const formId = `settings__${card}${card === "Contracts" ? `__${contracts[currentContract]}` : ""}`;
  const contract = contracts[currentContract];
  const toggleClass = toggle
    ? classes.settings.btnClose
    : classes.settings.btnChange;

  const show = showHandler(card, dataContracts, contract);
  const canDeactivate = contract !== "subscription" && exist && !deactivate;
  const isContractTabOpen = card === "Contracts" && toggle && dataContracts;

  return (
    <div className={classes.settings.menu}>
      <button onClick={() => setToggle(!toggle)} className={toggleClass} />
      {toggle && show && (
        <button
          className={classes.settings.btnFetch}
          type="submit"
          form={formId}
        />
      )}

      {isContractTabOpen && (
        <>
          {canDeactivate && (
            <button
              className={classes.settings.trash}
              onClick={() => setDeactivate(true)}
            />
          )}
          <button className={classes.settings.next} onClick={nextHandler} />
        </>
      )}
    </div>
  );
}
