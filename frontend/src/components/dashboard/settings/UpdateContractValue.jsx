import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import { useState } from "react";
import ActivateService from "./ActivateService";
import ContractInputField from "../../../ui/forms/ContractInputField";
const { currencyMap } = bundle.constants;

export default function UpdateContractValue({ keys, props, contractProps }) {
  const { classes, strings, card, setError } = props;
  const {
    currentContract,
    contracts,
    dataContracts,
    setDataContracts,
    exist,
    nextHandler,
  } = contractProps;
  const contract = contracts[currentContract];
  const [currency, setCurrency] = useState(null);

  const retrieveConfig = {
    data: { retrieve: "currency" },
    setter: setCurrency,
    key: "currency",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    if (Object.keys(data).length === 0) return;

    let isZero = false;

    for (let datum in data) {
      data[datum] = Number(data[datum]);
      isZero = !isZero ? data[datum] === 0 : isZero;
    }

    if (isZero) {
      setError(`zero_${contract}`);
      return;
    }

    const update = await fetchUpdateSettings({ [contract]: data });

    if (update.error) {
      return;
    }

    setDataContracts((prev) => ({
      ...prev,
      [contract]: { ...data },
    }));

    nextHandler();
  };

  const visibleKeys = keys.filter((key) => key !== "available");
  const { form } = classes.settings;

  return (
    <>
      {exist && (
        <form
          id={`settings__${card}__${contract}`}
          className={form}
          onSubmit={submitHandler}
        >
          {visibleKeys.map((key) => (
            <ContractInputField
              key={`input__${key}`}
              fieldKey={key}
              contractData={dataContracts[contract]}
              strings={strings}
              currencySymbol={currencyMap[currency]}
              classes={classes}
            />
          ))}
        </form>
      )}

      {contract !== "subscription" && !exist && (
        <ActivateService props={props} contractProps={contractProps} />
      )}
    </>
  );
}
