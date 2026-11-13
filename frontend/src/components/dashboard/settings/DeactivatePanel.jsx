import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useLang } from "../../../hooks/useLang";
import bundle from "shared";
const { contracts } = bundle.constants;

export default function DeactivatePanel({
  sharedProps,
  setDeactivate,
  setExist,
  contractProps,
}) {
  const { classes, strings, setError } = sharedProps;
  const { currentContract, setDataContracts } = contractProps;
  const contract = contracts[currentContract];
  const errorStrings = useLang(i18nAddresses.errors);

  const confirmHandler = async () => {
    const data = { contract };
    setError(null);
    const updated = await fetchDeactivateContract(data);

    if (updated.error) return setError(errorStrings.strings.generic);

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
      <button
        className={classes.settings.closeDeactivation}
        onClick={() => setDeactivate(false)}
      >
        {strings.close}
      </button>

      <button className={classes.settings.confirmBtn} onClick={confirmHandler}>
        {strings.deactivateOk}
      </button>
    </div>
  );
}
