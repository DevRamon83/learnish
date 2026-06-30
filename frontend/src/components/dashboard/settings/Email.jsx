import { useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
const { emailValidator } = bundle;

export default function Email({ props }) {
  const { strings, classes, card, setCard, toggle, setToggle } = props;

  const [userEmail, setUserEmail] = useState("");
  const retrieveConfig = {
    data: { retrieve: "email" },
    setter: setUserEmail,
    key: "email",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0) return;

    const isValid = emailValidator(data.email);

    if (isValid.error) {
      setToggle(!toggle);
      return;
    }

    const update = await fetchUpdateSettings(data);
    if (update.error) {
      return;
    }
    setToggle(!toggle);
    setUserEmail(data.email);
  };

  const { container, form } = classes.settings;

  return (
    <div className={container}>
      <h3 className="settings__title">{`La tua mail: ${userEmail}`}</h3>
      <div className="settings__imgContainer">
        <img src={"/email.jpeg"} />
      </div>

      {toggle && (
        <form onSubmit={submitHandler} className={toggle ? form : ""}>
          <input
            className="settings__email"
            type="text"
            id="email"
            name="email"
            placeholder={userEmail}
          />
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
