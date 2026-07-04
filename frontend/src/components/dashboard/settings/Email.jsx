import { useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
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
      <SettingsCommonTitle
        classes={classes}
        string={`${strings.yourMail} ${userEmail}`}
        src="/email.jpeg"
      />

      {toggle && (
        <form onSubmit={submitHandler} className={toggle ? form : ""}>
          <input
            className={classes.settings.emailInput}
            type="text"
            id="email"
            name="email"
            placeholder={userEmail}
          />
          <button className={classes.settings.btnFetch} type="submit" />
        </form>
      )}

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
      />

      <SettingsBreadcrumb props={props} />
    </div>
  );
}
