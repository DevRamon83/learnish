export default function InputContainer({ configObj, data, lang, classes }) {
  const { formContainer, uiStates, inputContainer, Element } = configObj;
  return (
    <div id={formContainer} className={uiStates.inputClass}>
      <div id={inputContainer} className={classes.inputs.container}>
        {<Element dataField={data} i18n={lang} />}
      </div>
      {uiStates.iconSrc && (
        <img className={classes.inputs.icon} src={uiStates.iconSrc} />
      )}
    </div>
  );
}
