import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function UpdateContractValue({
  configs,
  dataContainer,
  dataKey,
  containerClass,
  dataClass,
  setUserField,
  setError,
}) {
  const { classes, userField, type, contract, currency } = configs;
  const [changeField, setChangeField] = useState(false);

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

  return (
    <div className={containerClass}>
      <SettingsDataContainer
        type={"text"}
        data={`${dataContainer} ${userField[contract][dataKey]}${currency}`}
        containerClass={dataClass}
      />
      <form
        className={changeField ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changeField && (
          <input
            type={type}
            id={dataKey}
            name={dataKey}
            placeholder={userField[contract][dataKey]}
          />
        )}
        <SettingsButtonContainer
          toggle={changeField}
          setToggle={setChangeField}
          classes={classes.settings}
          setError={setError}
        />
      </form>
    </div>
  );
}
