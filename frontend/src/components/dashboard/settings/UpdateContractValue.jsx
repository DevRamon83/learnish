import bundle from "shared";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import { useState } from "react";
const { currencyMap } = bundle.constants;

export default function UpdateContractValue({
  configs,
  containerClass,
  setUserField,
  setError,
  keys,
  currentContract,
  nextHandler,
  contracts,
  props,
}) {
  const { classes, userField, type } = configs;
  const { strings } = props;
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

    setUserField((prev) => ({
      ...prev,
      [contract]: { ...data },
    }));

    nextHandler();
  };

  const visibleKeys = keys.filter((key) => key !== "available");
  const { form } = classes.settings;

  return (
    <form className={form} onSubmit={submitHandler}>
      {visibleKeys.map((key) => (
        <div key={`input__${key}`}>
          <label className={classes.settings.labelPrice} htmlFor={key}>
            {strings.labels[key]}: {userField[contract][key]}
            {currencyMap[currency]}
          </label>
          <input
            type={type}
            id={key}
            name={key}
            placeholder={userField[contract][key]}
            required={true}
          />
        </div>
      ))}

      <button className={classes.settings.btnFetch} type="submit" />
    </form>
  );
}
