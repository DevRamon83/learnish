const InputGroup = ({ dataField }) => {
  const inputProps = dataField.states || {};
  const eventHandlers = dataField.handlers || {};
  const { options, config } = dataField;
  const { inputRef, value } = inputProps;
  const { onChange } = eventHandlers;

  /*
  GLI STATI LI GESTISCI DOPO
  const funcOnChange = onChange ? onChange : () => {};
  dal jsx hai rimosso:
  value={value[id]}
  onChange={funcOnChange}
  */

  // i className dove vedi "" non sono personalizzabili
  return (
    <div className={""} ref={inputRef}>
      {config.title && <div className={""}>{config.title}</div>}
      {options.ids.map((id, index) => (
        <div key={id}>
          <input type={config.type} id={id} name={config.name} />
          <label htmlFor={id} className={config.classLabel}>
            {options.labels[index]}
          </label>
        </div>
      ))}
    </div>
  );
};

export default InputGroup;
