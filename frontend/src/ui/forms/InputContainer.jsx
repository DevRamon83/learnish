export default function InputContainer({ configObj, data, lang }) {
  const { formContainer, uiStates, inputContainer, Element } = configObj;
  return (
    <div id={formContainer} className={uiStates.inputClass}>
      <div id={inputContainer} className="form__inputContainer">
        {<Element dataField={data} i18n={lang} />}
      </div>
      {uiStates.iconSrc && (
        <img className="form__signup-icon" src={uiStates.iconSrc} />
      )}
    </div>
  );
}
