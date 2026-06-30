import { useMemo } from "react";
import UpdateContractValue from "./UpdateContractValue";

export default function ServiceMap({
  setUserField,
  keys,
  setterConfig,
  setError,
  props,
  setCurrentContract,
  currentContract,
  contracts,
}) {
  const { classes } = props;

  const nextHandler = () => {
    setCurrentContract((prev) => prev + 1);
    setError(null);
  };
  return (
    <>
      <UpdateContractValue
        key={`contract${currentContract}`}
        configs={setterConfig}
        containerClass={classes.settings.container}
        setUserField={setUserField}
        setError={setError}
        keys={keys}
        contracts={contracts}
        currentContract={currentContract}
        nextHandler={nextHandler}
        props={props}
      />

      <div onClick={nextHandler}>next</div>
    </>
  );
}
