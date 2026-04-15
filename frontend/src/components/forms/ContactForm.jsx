import { useRef, useState } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useRamonForm, EmailInput, TextareaInput } from "ramon-form-sdude";
import contactConfigBuilder from "../../forms/configs/contact";
import FormInput from "./FormInput";
import { classes } from "../../constants/components/forms";
import ErrorOnSubmit from "../ErrorOnSubmit";
import bundle from "shared";
import fetchNewMessage from "../../api/handlers/fetchNewMessage";
import MessageSent from "../MessageSent";
const { messageValidator } = bundle.validators;

export default function ContactForm() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const standardError = "invalid credentials";
  const { strings, lang } = useLang(i18nAddresses.contact);
  const date = Date.now();

  const objConfig = contactConfigBuilder(strings, "login");

  const { fields, textareas } = useRamonForm(objConfig);

  const validate = (data) => {
    const validMessage = messageValidator(data);
    console.log(validMessage);
    if (validMessage.error) {
      setError(standardError);
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const submit = Date.now();
    const time = submit - date;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    data.time = time;
    const isValidData = validate(data);
    if (!isValidData) return;

    const response = await fetchNewMessage(data);

    if (response.error) {
      setError(standardError);
      return;
    }

    setSuccess(true);
    formRef.current.reset();
  };

  return (
    <>
      {success && <MessageSent strings={strings} classes={classes} />}
      <form
        className={success ? classes.contact.formHide : classes.contact.form}
        ref={formRef}
        onSubmit={submitHandler}
      >
        <FormInput Element={EmailInput} data={fields.email} lang={lang} />
        <FormInput
          Element={TextareaInput}
          data={textareas.message}
          lang={lang}
        />
        <ErrorOnSubmit error={error} />
        <button className={classes.btn.message}>{strings.send}</button>
      </form>
    </>
  );
}
