import { useState } from "react";
import SettingsBtn from "../../../ui/buttons/SettingsBtn";
import { classes } from "../../../constants/components/dashboard";
import CloseSettingsBtn from "../../../ui/buttons/CloseSettingsBtn";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import { validateText } from "./validators";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
const { currency } = bundle.constants;

export default function Currency({ strings, user }) {
  const [changeCurrency, setChangeCurrency] = useState(false);
  const [userCurrency, setUserCurrency] = useState("");
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
    const isValidData = validateText(data);

    if (isValidData.error) {
      setChangeCurrency(!changeCurrency);
      return;
    }

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
    <div className={classes.settings.container}>
      <SettingsDataContainer
        type={"text"}
        data={userCurrency}
        classes={classes.settings}
      />

      <form
        className={changeCurrency ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changeCurrency && (
          <select name="currency" id="currency" defaultValue={userCurrency}>
            <option value="dollar">dollari</option>
            <option value="euro">euro</option>
          </select>
        )}
        <CloseSettingsBtn
          classes={classes.settings}
          state={changeCurrency}
          setter={setChangeCurrency}
        />
        <SettingsBtn classes={classes.settings} state={changeCurrency} />
      </form>
    </div>
  );
}
