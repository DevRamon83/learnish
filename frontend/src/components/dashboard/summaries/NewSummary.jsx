import { TextareaInput, UrlInput, useRamonForm } from "ramon-form-sdude";
import FormInput from "../../forms/FormInput";
import { useState } from "react";
import { useRef } from "react";
import summaryConfigBuilder from "../../../forms/configs/summary";
import ErrorOnSubmit from "../../ErrorOnSubmit";
import {
  classes,
  newSummaryInitialStatus,
  newSummaryInitialStep,
} from "../../../constants/components/dashboard";
import { useHideOverflow } from "../../../hooks/useHideOverflow";
import SummaryUpload from "../../../ui/summary/SummaryUpload";
import useUploadSummary from "../../../hooks/useUploadSummary";
import NewSummaryTitle from "../../../ui/summary/NewSummaryTitle";
import { submitHandler } from "../../../helpers/newSummary";

export default function NewSummary({
  panel,
  setPanel,
  strings,
  lang,
  setRetry,
}) {
  const [error, setError] = useState(null);
  const [newSummary, setNewSummary] = useState(null);
  const [isUiBlocked, setIsUiBlocked] = useState(false);
  const formRef = useRef();
  useHideOverflow(panel);

  const objConfig = summaryConfigBuilder(strings);
  const { fields, textareas, resets } = useRamonForm(objConfig);
  const { summary } = textareas;

  // This custom hook orchestrates the entire sequential pipeline (creating the draft,
  // generating AI corrections, and computing error statistics).
  // The external submitHandler simply updates states to start this process.
  const { states, setters } = useUploadSummary(
    newSummary,
    lang,
    setIsUiBlocked,
  );
  const { setUploadStep, setUploadStatus, setSummaryID } = setters;

  const closeHandler = async () => {
    const { summaryID } = states;
    if (summaryID) {
      setRetry((prev) => prev + 1);
    }

    resets.resetAll();
    setIsUiBlocked(false);
    setUploadStep(newSummaryInitialStep);
    setUploadStatus(newSummaryInitialStatus);
    setNewSummary(false);
    setPanel(false);
    setSummaryID(null);
  };

  return (
    <>
      {panel && (
        <div className={classes.summary.newPanel}>
          <form
            className={classes.summary.form}
            ref={formRef}
            onSubmit={(e) =>
              submitHandler(
                e,
                formRef,
                setError,
                setUploadStep,
                setNewSummary,
                lang,
              )
            }
          >
            <NewSummaryTitle
              strings={strings}
              classes={classes}
              closeHandler={closeHandler}
            />
            <FormInput Element={UrlInput} data={fields.title} lang={lang} />
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
      {isUiBlocked && (
        <div className="summary__uiBlocker">
          <p>TESTO DI PROVA</p>
        </div>
      )}
    </>
  );
}
