import {
  EmailInput,
  PasswordInput,
  RadioInput,
  TextInput,
  useRamonForm,
} from "ramon-form-sdude";
import authConfigBuilder from "../../forms/configs/auth";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "./FormInput";
import fetchSignup from "../../api/handlers.js/fetchSignup";
import { useState, useRef } from "react";
import bundle from "shared";
import finalizeAuth from "../../utils/finalizeAuth";
import ErrorOnSubmit from "./ErrorOnSubmit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/slices/authSlice";
const { authValidator } = bundle.validators;

export default function SignupForm() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const standardError = "registration failed. check your data";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { strings, lang } = useLang(i18nAddresses.auth);
  const objConfig = authConfigBuilder(strings, "signup");

  const { fields, groups } = useRamonForm(objConfig);
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
    if (!isValidData) return;
    setError(null);
    dispatch(setAuth("pending"));

    const response = await fetchSignup(data);

    const config = { dispatch, navigate, setAuth, setUser, standardError };

    finalizeAuth(response, config, setError);
  };

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
        <ErrorOnSubmit error={error} />
        <button>Invia</button>
      </form>
    </>
  );
}
