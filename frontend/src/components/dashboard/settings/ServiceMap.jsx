import { useMemo } from "react";
import UpdateContractValue from "./UpdateContractValue";

export default function ServiceMap({
  setUserField,
  strings,
  keys,
  setterConfig,
  setError,
}) {
  const visibleKeys = useMemo(() => {
    return keys.filter((key) => key !== "available");
  }, [keys]);

  const classes = setterConfig.classes.settings;

  return (
    <>
      {visibleKeys.map((key, index) => (
        <div
          className={classes.priceContainer}
          key={`${setterConfig.contract}_${key}`}
        >
          <UpdateContractValue
            dataKey={key}
            configs={setterConfig}
            dataContainer={`${strings.labels[key]}`}
            containerClass={
              index % 2 === 0 ? classes.oddContainer : classes.evenContainer
            }
            dataClass={index % 2 === 0 ? classes.oddData : classes.evenData}
            setUserField={setUserField}
            setError={setError}
          />
        </div>
      ))}
    </>
  );
}
