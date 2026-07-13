import { PasswordInput, TextInput, useRamonForm } from "ramon-form-sdude";
import authConfigBuilder from "../../forms/configs/auth";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "./FormInput";
import fetchLogin from "../../api/handlers/fetchLogin";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/slices/authSlice";
import bundle from "shared";
import finalizeAuth from "../../utils/finalizeAuth";
import ErrorOnSubmit from "../ErrorOnSubmit";
import { classes } from "../../constants/components/forms";
import ForgottenPsw from "./ForgottenPsw";
const { authValidator } = bundle.validators;

export default function LoginForm() {
  const formRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [newPsw, setNewPsw] = useState(false);
  const standardError = "invalid credentials";

  const { strings, lang } = useLang(i18nAddresses.auth);
  const errorStrings = useLang(i18nAddresses.errors);
  const objConfig = authConfigBuilder(strings, "login");

  const { fields } = useRamonForm(objConfig);
  const { username, password } = fields;

  const validate = (data) => {
    const isValidData = authValidator("/login", data);
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

    const resp = await fetchLogin(data);

    const config = {
      dispatch,
      navigate,
      setAuth,
      setUser,
      strings: errorStrings,
    };

    finalizeAuth(resp.response, config, setError);
  };

  const newPasswordHandler = () => {
    setNewPsw(!newPsw);
    setError(null);
  };

  return (
    <>
      {newPsw ? (
        <ForgottenPsw
          classes={classes}
          lang={lang}
          strings={strings}
          username={username}
          TextInput={TextInput}
          error={error}
          setError={setError}
          errorStrings={errorStrings}
        />
      ) : (
        <>
          <form
            className={classes.login}
            ref={formRef}
            onSubmit={submitHandler}
          >
            <FormInput Element={TextInput} data={username} lang={lang} />
            <FormInput Element={PasswordInput} data={password} lang={lang} />
            <ErrorOnSubmit error={error} />
            <button className={classes.btn.login}>{strings.login}</button>
          </form>
        </>
      )}
      <div>
        <div onClick={newPasswordHandler}>
          {newPsw ? strings.backToLogin : strings.forgottenPsw}
        </div>
      </div>
    </>
  );
}
