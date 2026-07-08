import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import bundle from "shared";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
const { currencies } = bundle.constants;

export default function Currency({ props }) {
  const [currency, setCurrency] = useState(null);
  const { strings, card, toggle, setToggle, classes } = props;

  const retrieveConfig = {
    data: { retrieve: "currency" },
    setter: setCurrency,
    key: "currency",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    if (Object.keys(data).length === 0) return;

    const isValid = currencies.includes(data.currency);

    if (!isValid) {
      setToggle(!toggle);
      return;
    }

    const update = await fetchUpdateSettings(data);

    if (update.error) {
      return;
    }

    setToggle(!toggle);
    setCurrency(data.currency);
  };

  const { form } = classes.settings;

  return (
    <>
      <SettingsCommonTitle
        classes={classes}
        string={strings.currencyTitle}
        src="/currency.jpeg"
      />

      {toggle && (
        <form
          id={`settings__${card}`}
          className={toggle ? form : ""}
          onSubmit={submitHandler}
        >
          <select
            className={classes.settings.currencyInput}
            name="currency"
            id="currency"
            defaultValue={currency}
          >
            <option value="dollar">{strings.dollars}</option>
            <option value="euro">{strings.euro}</option>
          </select>
        </form>
      )}
    </>
  );
}
