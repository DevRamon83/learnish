import { useState } from "react";
import SettingsBtn from "../../../ui/buttons/SettingsBtn";
import { classes } from "../../../constants/components/dashboard";
import CloseSettingsBtn from "../../../ui/buttons/CloseSettingsBtn";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import { PasswordInput, useRamonForm } from "ramon-form-sdude";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import newPswConfigBuilder from "../../../forms/configs/changePsw";
import FormInput from "../../forms/FormInput";
import { validatePsw } from "./validators";
import fetchUpdatePassword from "../../../api/handlers/fetchUpdatePassword";

export default function Password() {
  const [changePsw, setChangePsw] = useState(false);

  const { strings, lang } = useLang(i18nAddresses.settings);
  const objConfig = newPswConfigBuilder(strings, "signup");
  const { fields } = useRamonForm(objConfig);
  const { password, newPassword, confirmNewPassword } = fields;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!changePsw) setChangePsw(!changePsw);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const isValidData = validatePsw(data);

    if (isValidData.error) {
      setChangePsw(!changePsw);
      console.log("data ", isValidData);
      return;
    }

    const update = await fetchUpdatePassword(data);
    if (update.error) {
      return;
    }

    setChangePsw(!changePsw);
  };

  return (
    <div className={classes.settings.pswContainer}>
      <SettingsDataContainer
        type={"text"}
        data={"cambia la tua password"}
        classes={classes.settings}
      />

      <form
        className={changePsw ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changePsw && (
          <>
            <FormInput Element={PasswordInput} data={password} lang={lang} />
            <FormInput Element={PasswordInput} data={newPassword} lang={lang} />
            <FormInput
              Element={PasswordInput}
              data={confirmNewPassword}
              lang={lang}
            />
          </>
        )}
        <CloseSettingsBtn
          classes={classes.settings}
          state={changePsw}
          setter={setChangePsw}
        />
        <SettingsBtn classes={classes.settings} state={changePsw} />
      </form>
    </div>
  );
}
