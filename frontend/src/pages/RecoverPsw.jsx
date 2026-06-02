import { useParams } from "react-router-dom";
import { PasswordInput, useRamonForm } from "ramon-form-sdude";
import authConfigBuilder from "../forms/configs/auth";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useRef, useState } from "react";
import { classes } from "../constants/components/forms";
import FormInput from "../components/forms/FormInput";
import ErrorOnSubmit from "../components/ErrorOnSubmit";
import bundle from "shared";
import fetchNewPsw from "../api/handlers/fetchNewPsw";
const { passwordValidator } = bundle;

export default function RecoverPsw() {
  const { token } = useParams();
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [okRes, setOkRes] = useState(null);

  const { strings, lang } = useLang(i18nAddresses.auth);
  const errorStrings = useLang(i18nAddresses.errors);
  const objConfig = authConfigBuilder(strings, "login");

  const { fields } = useRamonForm(objConfig);
  const { password } = fields;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const isValidData = passwordValidator(data.password);
    if (isValidData.error) {
      const errorCode = `password_${isValidData.errorArray[0]}`;
      setError(errorStrings.strings[errorCode]);
      return;
    }

    const response = await fetchNewPsw(data, token);
    if (response.error) {
      return;
    }

    setOkRes(strings[response.message]);
  };

  return (
    <>
      <div className="recover">
        <form className={classes.login} ref={formRef} onSubmit={submitHandler}>
          <FormInput Element={PasswordInput} data={password} lang={lang} />
          <ErrorOnSubmit error={error} />
          <button className={classes.btn.login}>{strings.send}</button>
        </form>
      </div>
      {okRes && <div className="recover__ok">{okRes}</div>}
    </>
  );
}
