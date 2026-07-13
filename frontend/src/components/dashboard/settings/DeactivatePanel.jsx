import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useLang } from "../../../hooks/useLang";

export default function DeactivatePanel({ props, contractProps }) {
  const { classes, strings, setError } = props;
  const {
    setExist,
    setDataContracts,
    contracts,
    currentContract,
    setDeactivate,
  } = contractProps;
  const contract = contracts[currentContract];
  const errorStrings = useLang(i18nAddresses.errors);

  const confirmHandler = async () => {
    const data = { contract };
    setError(null);
    const updated = await fetchDeactivateContract(data);

    if (updated.error) {
      setError(errorStrings.strings.generic);
      return;
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
