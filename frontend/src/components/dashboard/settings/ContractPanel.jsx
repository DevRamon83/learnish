import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import ServiceMap from "./ServiceMap";
import SettingsContractTitle from "../../../ui/settings/SettingsContractTitle";
const { currencyMap } = bundle.constants;

export default function ContractPanel({
  config,
  currentContract,
  contracts,
  setCurrentContract,
  props,
}) {
  const { retriever, type } = config;
  const { classes, strings, userCurrency, setError } = props;

  const [userField, setUserField] = useState("");
  const [keys, setKeys] = useState([]);
  const contract = contracts[currentContract];
  const [exist, setExist] = useState(false);
  const retrieveConfig = {
    data: { retrieve: retriever },
    setter: setUserField,
    key: "contract",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const availableHandler = () => {
    if (contract === "subscription") {
      setExist(true);
    } else {
      setExist(userField[contract].available);
    }
  };

  useEffect(() => {
    if (userField[contract]) {
      const myKeys = Object.keys(userField[contract]);
      setKeys(myKeys);
      availableHandler();
    }
  }, [userField, exist, currentContract]);

  const setterConfig = {
    classes,
    userField,
    type,
    contract,
    currency: currencyMap[userCurrency],
  };

  return (
    <div className={classes.settings.contractContainer}>
      <SettingsContractTitle
        setExist={setExist}
        exist={exist}
        setUserField={setUserField}
        contract={contract}
        props={props}
      />
      <ServiceMap
        setUserField={setUserField}
        keys={keys}
        setterConfig={setterConfig}
        setError={setError}
        contracts={contracts}
        currentContract={currentContract}
        setCurrentContract={setCurrentContract}
        props={props}
      />
    </div>
  );
}
