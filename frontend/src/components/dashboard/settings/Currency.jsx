import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import bundle from "shared";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
const { currencies } = bundle.constants;

export default function Currency({ props }) {
  const [currency, setCurrency] = useState(null);
  const { strings, user, setError, toggle, setToggle, classes } = props;

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

  const { container, form } = classes.settings;

  return (
    <div className={container}>
      <h3 className="settings__title">In che valuta vuoi essere pagato?</h3>
      <div className="settings__imgContainer">
        <img src={"/currency.jpeg"} />
      </div>

      {toggle && (
        <form className={toggle ? form : ""} onSubmit={submitHandler}>
          <select
            className="settings__currency"
            name="currency"
            id="currency"
            defaultValue={currency}
          >
            <option value="dollar">{strings.dollars}</option>
            <option value="euro">{strings.euro}</option>
          </select>
          <button className="settings__button-fetch" type="submit" />
        </form>
      )}

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
        submitHandler={submitHandler}
      />

      <SettingsBreadcrumb props={props} />
    </div>
  );
}
