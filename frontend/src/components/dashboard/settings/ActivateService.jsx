import { useState } from "react";
import PriceDefiner from "../../forms/PriceDefiner";
import fetchSettings from "../../../api/handlers/fetchSettings";
import bundle from "shared";
const { packs, qNa } = bundle.constants;

export default function ActivateService({ props, contractProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const { strings, lang, classes } = props;
  const { setDataContracts, setExist, contracts, currentContract } =
    contractProps;

  const service = contracts[currentContract];
  const pack = service === "qNa" ? qNa : packs;

  const panelHandler = async () => {
    const controller = new AbortController();

    const retriever = `contract.${service}`;

    const res = await fetchSettings({ retrieve: retriever }, controller.signal);
    if (res.error) {
      // error handler
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
