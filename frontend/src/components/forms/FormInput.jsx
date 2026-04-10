import { useEffect, useState } from "react";
import {
  idDefiner,
  INITIAL_UI_STATE,
  getErrorMsg,
  promiseHandler,
  uiDefiner,
} from "./utils";
import InputContainer from "../../ui/forms/InputContainer";

export default function FormInput({ Element, data, lang }) {
  const [uiStates, setUiStates] = useState(INITIAL_UI_STATE);

  const { formContainer, inputContainer } = idDefiner(data);
  const configObj = { formContainer, uiStates, inputContainer, Element };

  const resetUi = () => setUiStates(INITIAL_UI_STATE);
  const setter = (error, iconSrc, inputClass) => {
    setUiStates({ error, inputClass, iconSrc });
  };

  useEffect(() => {
    resetUi();

    const result = data.returns.onBlur;

    if (result instanceof Promise) {
      promiseHandler(result, setter);
      return;
    }

    if (!result) return;

    const defineText = result.error ? result.errorMsg : null;
    const { inputClass, iconSrc } = uiDefiner(result.error);
    setter(defineText, iconSrc, inputClass);
  }, [data.returns?.onBlur]);

  useEffect(() => {
    resetUi();

    if (data.returns.onChange?.error) {
      const errorMsg = getErrorMsg(data.returns.onChange);
      setter(errorMsg, "/invalid.svg", "form__input-error");
    }
  }, [data.returns?.onChange]);

  return (
    <>
      <div className="form__errorContainer">{uiStates.error}</div>
      <InputContainer data={data} lang={lang} configObj={configObj} />
    </>
  );
}
