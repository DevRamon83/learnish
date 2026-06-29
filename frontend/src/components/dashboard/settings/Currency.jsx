import { useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import bundle from "shared";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
const { currency } = bundle.constants;

export default function Currency({ props }) {
  const {
    strings,
    user,
    userCurrency,
    setUserCurrency,
    setError,
    toggle,
    setToggle,
    classes,
  } = props;
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

  const { container, form } = classes.settings;

  return (
    <div className={container}>
      <h3 className="settings__title">In che valuta vuoi essere pagato?</h3>
      <div className="settings__imgContainer">
        <img src={"/currency.jpeg"} />
      </div>

      {toggle && (
        <form className={toggle ? form : ""} onSubmit={submitHandler}>
          <select name="currency" id="currency" defaultValue={userCurrency}>
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
