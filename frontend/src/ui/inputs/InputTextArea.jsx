export default function Textarea({ objConfig, inputProps, eventHandlers }) {
  inputProps = inputProps || {};
  eventHandlers = eventHandlers || {};

  const { id, label, name, rows, cols, maxChars, textClass, labelText } =
    objConfig;
  const { inputRef, value } = inputProps;
  const { onChange, onBlur, onFocus, onKeyDown } = eventHandlers;

  const funcOnChange = onChange ? onChange : () => {};
  const funcOnBlur = onBlur ? onBlur : () => {};
  const funcOnFocus = onFocus ? onFocus : () => {};
  const funcOnKeyDown = onKeyDown ? onKeyDown : () => {};

  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <textarea
        spellCheck="false"
        maxLength={maxChars}
        className={textClass}
        id={id}
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        onChange={funcOnChange}
        onBlur={funcOnBlur}
        onFocus={funcOnFocus}
        onKeyDown={funcOnKeyDown}
        ref={inputRef}
      />

      {maxChars && (
        <div className="">
          <span>{label}</span> <br />
          <span>
            {value} / {maxChars}
          </span>
        </div>
      )}
    </>
  );
}
