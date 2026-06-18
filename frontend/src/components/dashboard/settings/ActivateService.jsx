import { useState } from "react";
import PriceDefiner from "../../forms/PriceDefiner";
import fetchSettings from "../../../api/handlers/fetchSettings";
import bundle from "shared";
const { packs, qNa } = bundle.constants;

export default function ActivateService({
  service,
  strings,
  lang,
  setUserField,
  setExist,
  classes,
}) {
  const [isOpen, setIsOpen] = useState(false);

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
      setUserField(res.contract);
      setExist(true);
    }

    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <div className={classes.activate} onClick={() => setIsOpen(true)}>
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
