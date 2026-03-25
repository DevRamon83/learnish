import {
  EmailInput,
  PasswordInput,
  RadioInput,
  SelectInput,
  TextInput,
  useRamonForm,
} from "ramon-form-sdude";
import { signupConfigBuilder } from "../../forms/configs/signup";
import { useRef } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import FormInput from "../../ui/FormInput";

export default function SignupForm() {
  const formRef = useRef();

  const { strings, lang } = useLang(i18nAddresses.auth);
  const objConfig = signupConfigBuilder(strings);

  const { fields, groups, selects } = useRamonForm(objConfig);
  const submitHandler = () => {};
  const { username, email, confirmEmail, password, confirmPassword } = fields;
  console.log("username ", username);
  const { privacy, tos } = groups;
  const { accountTypes } = selects;

  return (
    <>
      <form ref={formRef} onSubmit={submitHandler}>
        <FormInput Element={TextInput} data={username} lang={lang} />
        <FormInput Element={EmailInput} data={email} lang={lang} />
        <FormInput Element={EmailInput} data={confirmEmail} lang={lang} />
        <FormInput Element={PasswordInput} data={password} lang={lang} />
        <FormInput Element={PasswordInput} data={confirmPassword} lang={lang} />
        <FormInput Element={SelectInput} data={accountTypes} lang={lang} />
        <FormInput Element={RadioInput} data={privacy} lang={lang} />
        <FormInput Element={RadioInput} data={tos} lang={lang} />
      </form>
    </>
  );
}
