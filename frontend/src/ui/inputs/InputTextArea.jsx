import CharacterCounter from "./CharacterCounter";

export default function Textarea({ dataField }) {
  const inputProps = dataField.states || {};
  const eventHandlers = dataField.handlers || {};

  const { id, charLabel, rows, cols, maxChars, textClass, label } =
    dataField.config;
  const { inputRef, value } = inputProps;
  const { onChange, onBlur, onFocus, onKeyDown } = eventHandlers;

  const funcOnChange = onChange ? onChange : () => {};
  const funcOnBlur = onBlur ? onBlur : () => {};
  const funcOnFocus = onFocus ? onFocus : () => {};
  const funcOnKeyDown = onKeyDown ? onKeyDown : () => {};

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}

      <textarea
        spellCheck="false"
        maxLength={maxChars}
        className={textClass}
        id={id}
        rows={rows}
        cols={cols}
        name={id}
        value={value}
        onChange={funcOnChange}
        onBlur={funcOnBlur}
        onFocus={funcOnFocus}
        onKeyDown={funcOnKeyDown}
        ref={inputRef}
      />

      {maxChars && (
        <CharacterCounter
          dataField={maxChars}
          value={value}
          label={charLabel}
        />
      )}
    </>
  );
}
