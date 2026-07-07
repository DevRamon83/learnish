import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";

export default function DeactivatePanel({ props, contractProps }) {
  const { classes, strings } = props;
  const {
    setExist,
    setDataContracts,
    contracts,
    currentContract,
    setDeactivate,
  } = contractProps;
  const contract = contracts[currentContract];

  const confirmHandler = async () => {
    const data = { contract };
    const updated = await fetchDeactivateContract(data);

    if (updated.error) {
      return;
      // error handler
    }

    setExist(false);
    setDataContracts((prev) => ({
      ...prev,
      [contract]: {
        ...prev[contract],
        available: false,
      },
    }));
    setDeactivate(false);
  };

  return (
    <div className={classes.settings.popUp}>
      <div className={classes.settings.confirmTxt}>
        {strings.confirmDeactivate}
      </div>
      <div
        className={classes.settings.closeDeactivation}
        onClick={() => setDeactivate(false)}
      >
        {strings.close}
      </div>

      <div className={classes.settings.confirmBtn} onClick={confirmHandler}>
        {strings.deactivateOk}
      </div>
    </div>
  );
}
