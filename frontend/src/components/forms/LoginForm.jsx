import { PasswordInput, TextInput, useRamonForm } from "ramon-form-sdude";
import { signupConfigBuilder } from "../../forms/configs/signup";
import { useRef } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "../../ui/FormInput";
import fetchLogin from "../../api/handlers.js/fetchLogin";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/slices/authSlice";

export default function LoginForm() {
  const formRef = useRef();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { strings, lang } = useLang(i18nAddresses.auth);
  const objConfig = signupConfigBuilder(strings);

  const { fields } = useRamonForm(objConfig);
  const { username, password } = fields;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    if (!data) return;
    const response = await fetchLogin(data);
    if (!response.error) {
      setUserData(response);
    }
  };

  useEffect(() => {
    userData && navigate(`/dashboard/${userData.id}`);
    userData && dispatch(setUser(userData));
    userData && dispatch(setAuth(true));
  }, [userData]);

  return (
    <>
      <form ref={formRef} onSubmit={submitHandler}>
        <FormInput Element={TextInput} data={username} lang={lang} />
        <FormInput Element={PasswordInput} data={password} lang={lang} />
        <button>Invia</button>
      </form>
    </>
  );
}
