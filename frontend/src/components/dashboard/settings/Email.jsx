import { useState } from "react";
import SettingsBtn from "../../../ui/buttons/SettingsBtn";
import { classes } from "../../../constants/components/dashboard";
import CloseSettingsBtn from "../../../ui/buttons/CloseSettingsBtn";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import { validateText } from "./validators";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
const { emailValidator } = bundle;

export default function Email() {
  const [changeEmail, setChangeEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const retrieveConfig = {
    data: { retrieve: "email" },
    setter: setUserEmail,
    key: "email",
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!changeEmail) setChangeEmail(!changeEmail);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    const isValidData = validateText(data);
    if (isValidData.error) {
      setChangeEmail(!changeEmail);
      return;
    }

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
    <div className={classes.settings.container}>
      <SettingsDataContainer
        type={"text"}
        data={userEmail}
        classes={classes.settings}
      />

      <form
        className={changeEmail ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changeEmail && (
          <input type="text" id="email" name="email" placeholder={userEmail} />
        )}
        <CloseSettingsBtn
          classes={classes.settings}
          state={changeEmail}
          setter={setChangeEmail}
        />
        <SettingsBtn classes={classes.settings} state={changeEmail} />
      </form>
    </div>
  );
}
