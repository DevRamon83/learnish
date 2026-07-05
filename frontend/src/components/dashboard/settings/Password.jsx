import { useState } from "react";
import { classes } from "../../../constants/components/dashboard";
import { PasswordInput, useRamonForm } from "ramon-form-sdude";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import newPswConfigBuilder from "../../../forms/configs/changePsw";
import FormInput from "../../forms/FormInput";
import { validatePsw } from "./validators";
import fetchUpdatePassword from "../../../api/handlers/fetchUpdatePassword";
import Breadcrumb from "./Breadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function Password({ props }) {
  const { classes, card, setCard, toggle, setToggle } = props;

  const { strings, lang } = useLang(i18nAddresses.settings);
  const objConfig = newPswConfigBuilder(strings, "signup");
  const { fields } = useRamonForm(objConfig);
  const { password, newPassword, confirmNewPassword } = fields;

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0) return;

    const isValidData = validatePsw(data);

    if (isValidData.error) {
      setToggle(!toggle);
      return;
    }

    const update = await fetchUpdatePassword(data);
    if (update.error) {
      return;
    }

    setToggle(!toggle);
  };

  const { container, form } = classes.settings;

  return (
    <div className={container}>
      <SettingsCommonTitle
        classes={classes}
        string={strings.password}
        src="/locked.jpeg"
      />

      {toggle && (
        <>
          <form onSubmit={submitHandler} className={toggle ? form : ""}>
            <FormInput Element={PasswordInput} data={password} lang={lang} />
            <FormInput Element={PasswordInput} data={newPassword} lang={lang} />
            <FormInput
              Element={PasswordInput}
              data={confirmNewPassword}
              lang={lang}
            />
            <button className={classes.settings.btnFetch} type="submit" />
          </form>
        </>
      )}

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
      />

      <Breadcrumb props={props} />
    </div>
  );
}
