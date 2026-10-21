export default function ContractInputField({
  fieldKey,
  contractData,
  strings,
  currencySymbol,
  classes,
}) {
  return (
    <div className={classes.settings.contractInput}>
      <label className={classes.settings.labelPrice} htmlFor={fieldKey}>
        {strings.labels[fieldKey]}: {contractData[fieldKey]}
        {currencySymbol}
      </label>
      <input
        type="number"
        id={fieldKey}
        name={fieldKey}
        placeholder={contractData[fieldKey]}
        required={true}
      />
    </div>
  );
}
