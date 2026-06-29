import { useMemo } from "react";
import UpdateContractValue from "./UpdateContractValue";

export default function ServiceMap({
  setUserField,
  strings,
  keys,
  setterConfig,
  setError,
  classes,
  setCurrentContract,
  currentContract,
  contracts,
}) {
  return (
    <>
      <div className={classes.priceContainer}>
        <UpdateContractValue
          key={`contract${currentContract}`}
          configs={setterConfig}
          containerClass={classes.settings.container}
          setUserField={setUserField}
          setError={setError}
          keys={keys}
          contracts={contracts}
          currentContract={currentContract}
        />
      </div>

      <div onClick={() => setCurrentContract((prev) => prev + 1)}>next</div>
    </>
  );
}
