import { useEffect, useState } from "react";
import UpdateContractValue from "./UpdateContractValue";
import bundle from "shared";
const { contracts } = bundle.constants;

export default function ContractPanel({
  sharedProps,
  exist,
  setExist,
  contractProps,
  nextHandler,
}) {
  const { classes, strings } = sharedProps;
  const { currentContract, dataContracts } = contractProps;

  const [keys, setKeys] = useState([]);
  const contract = contracts[currentContract];

  const availableHandler = () => {
    if (contract === "subscription") {
      setExist(true);
    } else {
      setExist(dataContracts[contract].available);
    }
  };

  useEffect(() => {
    if (dataContracts && dataContracts[contract]) {
      const myKeys = Object.keys(dataContracts[contract]);
      setKeys(myKeys);
      availableHandler();
    }
  }, [dataContracts, currentContract]);

  return (
    <div className={classes.settings.contractContainer}>
      <div className={classes.settings.contractTitle}>
        <h3>{strings.contract[contract]}</h3>
      </div>
      <UpdateContractValue
        key={`contract${currentContract}`}
        keys={keys}
        sharedProps={sharedProps}
        exist={exist}
        setExist={setExist}
        nextHandler={nextHandler}
        contractProps={contractProps}
      />
    </div>
  );
}
