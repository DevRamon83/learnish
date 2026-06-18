import { useState } from "react";
import { classes } from "../../../constants/components/dashboard";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import bundle from "shared";
const { currency } = bundle.constants;

export default function Currency({
  strings,
  user,
  userCurrency,
  setUserCurrency,
  setError,
}) {
  const [changeCurrency, setChangeCurrency] = useState(false);
  const retrieveConfig = {
    data: { retrieve: "currency" },
    setter: setUserCurrency,
    key: "currency",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!changeCurrency) setChangeCurrency(!changeCurrency);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0) return;

    const isValid = currency.includes(data.currency);
    if (!isValid) {
      setChangeCurrency(!currency);
      return;
    }

    const update = await fetchUpdateSettings(data);
    if (update.error) {
      return;
    }

    setChangeCurrency(!currency);
    setUserCurrency(data.currency);
  };

  return (
    <div className={classes.settings.evenContainer}>
      <SettingsDataContainer
        type={"text"}
        data={userCurrency}
        containerClass={classes.settings.evenData}
      />

      <form
        className={changeCurrency ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changeCurrency && (
          <select name="currency" id="currency" defaultValue={userCurrency}>
            <option value="dollar">{strings.dollars}</option>
            <option value="euro">{strings.euro}</option>
          </select>
        )}

        <SettingsButtonContainer
          toggle={changeCurrency}
          setToggle={setChangeCurrency}
          classes={classes.settings}
          setError={setError}
        />
      </form>
    </div>
  );
}
