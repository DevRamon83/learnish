import {
  EmailInput,
  PasswordInput,
  RadioInput,
  SelectInput,
  TextInput,
  useRamonForm,
} from "ramon-form-sdude";
import authConfigBuilder from "../../forms/configs/auth";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "./FormInput";
import fetchSignup from "../../api/handlers/fetchSignup";
import { useState, useRef } from "react";
import bundle from "shared";
import ErrorOnSubmit from "../ErrorOnSubmit";
import { classes } from "../../constants/components/forms";
const { authValidator } = bundle.validators;

export default function SignupForm() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const standardError = "registration failed. check your data";

  const { strings, lang } = useLang(i18nAddresses.auth);
  const objConfig = authConfigBuilder(strings, "signup");

  const { fields, groups, selects } = useRamonForm(objConfig);
  const { username, email, confirmEmail, password, confirmPassword } = fields;
  const { privacy, tos } = groups;

  const validate = (data) => {
    const isValidData = authValidator("/signup", data);
    if (!data || isValidData.error) {
      setError(standardError);
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const isValidData = validate(data);

    if (!isValidData) {
      setError(standardError);
      return;
    }

    setError(null);

    const response = await fetchSignup(data);

    if (response.error) {
      return;
    }

    setSuccess(true);
    console.log(response);
  };

  return (
    <>
      {success ? (
        <div>{strings.confirmMsg}</div>
      ) : (
        <form className={classes.signup} ref={formRef} onSubmit={submitHandler}>
          <FormInput Element={TextInput} data={username} lang={lang} />
          <FormInput Element={EmailInput} data={email} lang={lang} />
          <FormInput Element={EmailInput} data={confirmEmail} lang={lang} />
          <FormInput
            Element={SelectInput}
            data={selects.userType}
            lang={lang}
          />
          <FormInput Element={SelectInput} data={selects.plan} lang={lang} />
          <FormInput Element={PasswordInput} data={password} lang={lang} />
          <FormInput
            Element={PasswordInput}
            data={confirmPassword}
            lang={lang}
          />
          <FormInput Element={RadioInput} data={privacy} lang={lang} />
          <FormInput Element={RadioInput} data={tos} lang={lang} />
          <ErrorOnSubmit error={error} />
          <button className={classes.btn.send}>{strings.signup}</button>
        </form>
      )}
    </>
  );
}
