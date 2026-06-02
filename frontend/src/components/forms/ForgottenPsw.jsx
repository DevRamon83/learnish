import { useRef } from "react";
import FormInput from "./FormInput";
import fetchForgottenPsw from "../../api/handlers/fetchForgottenPsw";

export default function ForgottenPsw({
  lang,
  strings,
  classes,
  username,
  TextInput,
}) {
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    if (typeof data.username !== "string") {
      // handle error
      return;
    }
    const response = await fetchForgottenPsw(data);
    console.log(response);
  };

  return (
    <form className={classes.login} ref={formRef} onSubmit={submitHandler}>
      <FormInput Element={TextInput} data={username} lang={lang} />
      <button className={classes.btn.login}>{strings.recover}</button>
    </form>
  );
}
