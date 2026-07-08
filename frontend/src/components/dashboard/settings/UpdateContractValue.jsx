import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import { useState } from "react";
import ActivateService from "./ActivateService";
const { currencyMap } = bundle.constants;

export default function UpdateContractValue({ keys, props, contractProps }) {
  const { classes, strings, card, setError } = props;
  const { currentContract, contracts, dataContracts, setDataContracts, exist } =
    contractProps;
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
      isZero = data[datum] === 0;
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
            <div
              className={classes.settings.contractInput}
              key={`input__${key}`}
            >
              <label className={classes.settings.labelPrice} htmlFor={key}>
                {strings.labels[key]}: {dataContracts[contract][key]}
                {currencyMap[currency]}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                placeholder={dataContracts[contract][key]}
                required={true}
              />
            </div>
          ))}
        </form>
      )}

      {contract !== "subscription" && !exist && (
        <ActivateService props={props} contractProps={contractProps} />
      )}
    </>
  );
}
