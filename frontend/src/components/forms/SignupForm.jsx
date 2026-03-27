import {
  EmailInput,
  PasswordInput,
  RadioInput,
  TextInput,
  useRamonForm,
} from "ramon-form-sdude";
import { signupConfigBuilder } from "../../forms/configs/signup";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "../../ui/FormInput";
import fetchSignup from "../../api/handlers.js/fetchSignup";
import { useState, useRef, useEffect } from "react";
import bundle from "shared";
const { authValidator } = bundle.validators;

export default function SignupForm() {
  const formRef = useRef();
  const [userData, setUserData] = useState(null);
  const [errorRes, setErrorRes] = useState(null);

  const { strings, lang } = useLang(i18nAddresses.auth);
  const objConfig = signupConfigBuilder(strings);

  const { fields, groups } = useRamonForm(objConfig);
  const { username, email, confirmEmail, password, confirmPassword } = fields;
  const { privacy, tos } = groups;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const isValidData = authValidator("/signup", data);

    if (!data || isValidData.error) {
      // error handler logic
      return;
    }

    const response = await fetchSignup(data);
    dispatch(setAuth("pending"));
    if (!response.error) {
      setErrorRes(response.errorMessage);
    } else {
      setUserData(response);
      setErrorRes(null);
    }
  };

  useEffect(() => {
    userData && dispatch(setUser(userData));
    userData && dispatch(setAuth("authenticated"));
  }, [userData]);

  return (
    <>
      <form ref={formRef} onSubmit={submitHandler}>
        <FormInput Element={TextInput} data={username} lang={lang} />
        <FormInput Element={EmailInput} data={email} lang={lang} />
        <FormInput Element={EmailInput} data={confirmEmail} lang={lang} />
        <FormInput Element={PasswordInput} data={password} lang={lang} />
        <FormInput Element={PasswordInput} data={confirmPassword} lang={lang} />
        <FormInput Element={RadioInput} data={privacy} lang={lang} />
        <FormInput Element={RadioInput} data={tos} lang={lang} />
        <button>Invia</button>
      </form>
      {errorRes && <div>{errorRes}</div>}
    </>
  );
}
