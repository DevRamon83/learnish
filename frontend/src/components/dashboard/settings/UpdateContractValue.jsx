import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function UpdateContractValue({
  configs,
  containerClass,
  setUserField,
  setError,
  keys,
  currentContract,
  contracts,
}) {
  const { classes, userField, type, currency } = configs;
  const [changeField, setChangeField] = useState(false);
  const contract = contracts[currentContract];

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (!changeField) setChangeField(!changeField);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    // The same button that submits data also toggles the input visibility.
    // We must prevent the fetch request when there is no data.

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
      [contract]: {
        [dataKey]: data[dataKey],
      },
    }));

    setChangeField(!changeField);
  };

  const visibleKeys = keys.filter((key) => key !== "available");
  return (
    <form
      className={changeField ? classes.settings.form : ""}
      onSubmit={submitHandler}
    >
      {visibleKeys.map((key) => (
        <input
          key={`input__${key}`}
          type={type}
          id={key}
          name={key}
          placeholder={userField[contract][key]}
        />
      ))}
      <button type="submit">salva</button>
    </form>
  );
}
