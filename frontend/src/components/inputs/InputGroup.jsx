const InputGroup = ({ dataField }) => {
  const inputProps = dataField.states || {};
  const eventHandlers = dataField.handlers || {};
  const { options, config } = dataField;
  const { inputRef, value } = inputProps;
  const { onChange } = eventHandlers;
  const funcOnChange = onChange ? onChange : () => {};

  return (
    <div className={""} ref={inputRef}>
      {config.title && <div className={""}>{config.title}</div>}
      {options.ids.map((id, index) => (
        <div key={id}>
          <input
            type={config.type}
            id={id}
            name={config.type === "checkbox" ? id : config.name}
            checked={config.type === "checkbox" ? value[id] : value === id}
            onChange={funcOnChange}
            value={id}
          />
          <label htmlFor={id} className={config.classLabel}>
            {options.labels[index]}
          </label>
        </div>
      ))}
    </div>
  );
};

export default InputGroup;
