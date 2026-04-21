import { TextareaInput, UrlInput, useRamonForm } from "ramon-form-sdude";
import FormInput from "../../forms/FormInput";
import { useState } from "react";
import { useRef } from "react";
import summaryConfigBuilder from "../../../forms/configs/summary";
import ErrorOnSubmit from "../../ErrorOnSubmit";
import bundle from "shared";
import {
  classes,
  newSummaryInitialStatus,
  newSummaryInitialStep,
} from "../../../constants/layout/dashboard";
import { useHideOverflow } from "../../../hooks/useHideOverflow";
import SummaryUpload from "../../../ui/summary/SummaryUpload";
import useUploadSummary from "../../../hooks/useUploadSummary";
import NewSummaryTitle from "../../../ui/summary/NewSummaryTitle";
const { summaryValidator } = bundle.validators;

export default function NewSummary({
  panel,
  setPanel,
  strings,
  lang,
  setData,
}) {
  const [error, setError] = useState(null);
  const [newSummary, setNewSummary] = useState(null);
  const formRef = useRef();
  useHideOverflow(panel);

  const objConfig = summaryConfigBuilder(strings);
  const { fields, textareas, resets } = useRamonForm(objConfig);
  const { summary } = textareas;

  const { states, setters } = useUploadSummary(newSummary, lang);
  const { setUploadStep, setUploadStatus, setSummaryData } = setters;

  const validate = (data) => {
    if (!data) {
      setError("there is no data");
      return { error: true };
    }
    const { youtube, summary } = data;
    const objValidator = { youtube, summary, lang, caller: "frontend" };

    const validData = summaryValidator(objValidator);
    if (validData.error) {
      setError("invalid url");
      return { error: true, errorMsg: validData.errorMsg };
    }

    return { error: false, idVideo: validData.idVideo, summary: data.summary };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const isValidData = validate(data);

    if (isValidData.error) {
      // error handler
      return;
    }

    setUploadStep((prev) => ({ ...prev, draft: true }));
    const dataObj = {
      idVideo: isValidData.idVideo,
      summary: isValidData.summary,
      lang,
    };
    setNewSummary(dataObj);
  };

  const closeHandler = () => {
    if (states.summary) {
      const uploadedSummary = states.summary.summary;
      setData((prev) => [uploadedSummary, ...prev]);
    }
    resets.resetAll();
    setUploadStep(newSummaryInitialStep);
    setUploadStatus(newSummaryInitialStatus);
    setNewSummary(false);
    setPanel(false);
    setSummaryData(null);
  };

  return (
    <>
      {panel && (
        <div className={classes.summary.newPanel}>
          <form
            className={classes.summary.form}
            ref={formRef}
            onSubmit={submitHandler}
          >
            <NewSummaryTitle
              strings={strings}
              classes={classes}
              closeHandler={closeHandler}
            />
            <FormInput Element={UrlInput} data={fields.youtube} lang={lang} />
            <FormInput Element={TextareaInput} data={summary} lang={lang} />
            <ErrorOnSubmit error={error} />
            {states.status.draft ? (
              <SummaryUpload
                strings={strings}
                states={states}
                setters={setters}
              />
            ) : (
              <button className={classes.summary.btnSend}>
                {strings.sendSummary}
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
