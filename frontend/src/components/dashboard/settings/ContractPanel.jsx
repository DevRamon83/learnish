import { useEffect, useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
import ServiceMap from "./ServiceMap";
import SettingsContractTitle from "../../../ui/settings/SettingsContractTitle";
const { currencyMap } = bundle.constants;

export default function ContractPanel({
  config,
  strings,
  userCurrency,
  lang,
  currentContract,
  contracts,
  setError,
  classes,
  setCurrentContract,
}) {
  const { retriever, type } = config;

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
        strings={strings}
        setExist={setExist}
        exist={exist}
        setUserField={setUserField}
        classes={classes.settings}
        contract={contract}
        lang={lang}
      />
      <ServiceMap
        setUserField={setUserField}
        strings={strings}
        keys={keys}
        setterConfig={setterConfig}
        setError={setError}
        classes={classes}
        contracts={contracts}
        currentContract={currentContract}
        setCurrentContract={setCurrentContract}
      />
    </div>
  );
}
