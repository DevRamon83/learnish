import { useState } from "react";
import { classes } from "../../../constants/components/dashboard";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
const { emailValidator } = bundle;

export default function Email({ strings, setError }) {
  const [changeEmail, setChangeEmail] = useState(false);
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

    if (!changeEmail) setChangeEmail(!changeEmail);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const isValid = emailValidator(data.email);
    if (isValid.error) {
      setChangeEmail(!changeEmail);
      return;
    }
    const update = await fetchUpdateSettings(data);
    if (update.error) {
      return;
    }

    setChangeEmail(!changeEmail);
    setUserEmail(data.email);
  };

  return (
    <div className={classes.settings.evenContainer}>
      <SettingsDataContainer
        type={"text"}
        data={userEmail}
        containerClass={classes.settings.evenData}
      />

      <form
        className={changeEmail ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changeEmail && (
          <input type="text" id="email" name="email" placeholder={userEmail} />
        )}

        <SettingsButtonContainer
          toggle={changeEmail}
          setToggle={setChangeEmail}
          classes={classes.settings}
          setError={setError}
        />
      </form>
    </div>
  );
}
