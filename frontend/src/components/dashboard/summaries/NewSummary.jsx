import { TextareaInput, UrlInput, useRamonForm } from "ramon-form-sdude";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useLang } from "../../../hooks/useLang";
import FormInput from "../../forms/FormInput";
import { useState } from "react";
import { useRef } from "react";
import summaryConfigBuilder from "../../../forms/configs/summary";
import ErrorOnSubmit from "../../ErrorOnSubmit";
import fetchNewSummaries from "../../../api/handlers.js/fetchNewSummary";
import bundle from "shared";
const { summaryValidator } = bundle.validators;

export default function NewSummary({ panel, setPanel }) {
  const [error, setError] = useState(null);
  const formRef = useRef();
  const { strings, lang } = useLang(i18nAddresses.summary);
  const objConfig = summaryConfigBuilder(strings, "login");
  const { fields, textareas } = useRamonForm(objConfig);
  const { summary } = textareas;

  const validate = (data) => {
    if (!data) {
      setError("there is no data");
      return { error: true };
    }
    const isValidUrl = summaryValidator(data.youtube);
    if (isValidUrl.error) {
      setError("invalid url");
      return { error: true };
    }

    return { error: false, idVideo: isValidUrl.idVideo, summary: data.summary };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const isValidData = validate(data);
    if (isValidData.error) return;
    const dataObj = {
      idVideo: isValidData.idVideo,
      summary: isValidData.summary,
    };
    const newSummary = await fetchNewSummaries(dataObj);
  };
  return (
    <>
      {panel && (
        <>
          <button onClick={() => setPanel(false)}>chiudi</button>
          <p>crea un nuovo sommario</p>
          <form ref={formRef} onSubmit={submitHandler}>
            <FormInput Element={UrlInput} data={fields.youtube} lang={lang} />
            <FormInput Element={TextareaInput} data={summary} lang={lang} />
            <ErrorOnSubmit error={error} />
            <button>Invia</button>
          </form>
        </>
      )}
    </>
  );
}
