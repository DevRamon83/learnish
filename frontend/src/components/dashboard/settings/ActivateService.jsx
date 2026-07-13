import { useState } from "react";
import PriceDefiner from "../../forms/PriceDefiner";
import fetchSettings from "../../../api/handlers/fetchSettings";
import bundle from "shared";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
const { packs, qNa } = bundle.constants;

export default function ActivateService({ props, contractProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const errorStrings = useLang(i18nAddresses.errors);
  const { strings, lang, classes, setError } = props;
  const { setDataContracts, setExist, contracts, currentContract } =
    contractProps;

  const service = contracts[currentContract];
  const pack = service === "qNa" ? qNa : packs;

  const panelHandler = async () => {
    const controller = new AbortController();
    setError(null);

    const retriever = `contract.${service}`;

    const res = await fetchSettings({ retrieve: retriever }, controller.signal);
    if (res.error) {
      setError(errorStrings.strings.generic);
      return;
    }

    if (res.contract) {
      const contract = contracts[currentContract];
      const data = res.contract[contract];
      setDataContracts((prev) => ({
        ...prev,
        [contract]: data,
      }));
      setExist(true);
    }

    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <div
          className={classes.settings.activate}
          onClick={() => setIsOpen(true)}
        >
          {strings.activate}
        </div>
      ) : (
        <PriceDefiner
          key={service}
          strings={strings}
          lang={lang}
          setStatus={panelHandler}
          status={service}
          title={strings[service]}
          next="finish"
          packs={pack}
          caller="activate"
        />
      )}
    </>
  );
}
