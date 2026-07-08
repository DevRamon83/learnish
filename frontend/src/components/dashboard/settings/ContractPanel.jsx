import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import UpdateContractValue from "./UpdateContractValue";
const { currencyMap } = bundle.constants;

export default function ContractPanel({ props, contractProps }) {
  const { classes, strings, userCurrency } = props;
  const {
    contracts,
    currentContract,
    dataContracts,
    setDataContracts,
    exist,
    setExist,
  } = contractProps;
  const [keys, setKeys] = useState([]);
  const contract = contracts[currentContract];
  const retrieveConfig = {
    data: { retrieve: "contract" },
    setter: setDataContracts,
    key: "contract",
    strings,
  };

  useRetrievePersonalSettings(retrieveConfig);

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
