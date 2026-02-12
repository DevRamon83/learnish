const InputField = ({ dataField }) => {
  const inputProps = dataField.states || {};
  const eventHandlers = dataField.handlers || {};

  const { id, label, type, placeholder, name, autoComplete } = dataField.config;
  const { inputRef, value } = inputProps;
  const { onChange, onBlur, onFocus, onKeyDown } = eventHandlers;

  const funcOnChange = onChange ? onChange : () => {};
  const funcOnBlur = onBlur ? onBlur : () => {};
  const funcOnFocus = onFocus ? onFocus : () => {};
  const funcOnKeyDown = onKeyDown ? onKeyDown : () => {};

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={funcOnChange}
        onBlur={funcOnBlur}
        onFocus={funcOnFocus}
        onKeyDown={funcOnKeyDown}
        autoComplete={autoComplete}
        ref={inputRef}
      />
    </>
  );
};

export default InputField;
