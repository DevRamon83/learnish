import bundle from "shared";
const { summaryValidator } = bundle.validators;

const validate = (rawData, setError, lang) => {
  if (!rawData) {
    setError("there is no data");
    return { error: true };
  }
  const { title, youtube, summary } = rawData;
  const objValidator = { title, youtube, summary, lang, caller: "frontend" };

  const validData = summaryValidator(objValidator);
  if (validData.error) {
    setError(validData.errorMsg);
    return { error: true, errorMsg: validData.errorMsg };
  }

  return {
    error: false,
    title,
    idVideo: validData.idVideo,
    summary: rawData.summary,
  };
};

/**
 * Starts the summary creation process.
 * Extracts and validates the form data. If valid, it triggers the asynchronous
 * upload pipeline by setting the initial draft state.
 *
 * Extracted externally to keep the UI component clean, under 100 lines,
 * and strictly focused on rendering.
 */
export const submitHandler = async (
  e,
  formRef,
  setError,
  setUploadStep,
  setNewSummary,
  lang,
) => {
  e.preventDefault();
  const formData = new FormData(formRef.current);
  const rawData = Object.fromEntries(formData.entries());

  const isValidData = validate(rawData, setError, lang);

  if (isValidData.error) return;

  setUploadStep((prev) => ({ ...prev, draft: true }));
  const dataObj = {
    title: isValidData.title,
    idVideo: isValidData.idVideo,
    summary: isValidData.summary,
    lang,
  };

  setNewSummary(dataObj);
};
