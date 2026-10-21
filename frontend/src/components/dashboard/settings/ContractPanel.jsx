import { useEffect, useState } from "react";
import UpdateContractValue from "./UpdateContractValue";

export default function ContractPanel({ props, contractProps }) {
  const { classes, strings } = props;
  const { contracts, currentContract, dataContracts, exist, setExist } =
    contractProps;
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
  }, [dataContracts, exist, currentContract]);

  return (
    <div className={classes.settings.contractContainer}>
      <div className={classes.settings.contractTitle}>
        <h3>{strings.contract[contract]}</h3>
      </div>
      <UpdateContractValue
        key={`contract${currentContract}`}
        keys={keys}
        props={props}
        contractProps={contractProps}
      />
    </div>
  );
}
