const SelectInput = ({ dataField }) => {
  const inputProps = dataField.states || {};
  const eventHandlers = dataField.handlers || {};
  const { options, id, labels, labelText } = dataField.config;

  const { inputRef, value } = inputProps;
  const { onChange } = eventHandlers;

  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <select
        ref={inputRef}
        name={id}
        id={id}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={option} value={option}>
            {labels[index]}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;
