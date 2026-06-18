import { useEffect, useState } from "react";
import PriceDefiner from "../../forms/PriceDefiner";
import bundle from "shared";
import { classes } from "../../../constants/components/dashboard";
const { contracts, subscription, packs, qNa } = bundle.constants;

export default function DispatchContractForm({ strings, lang, setIsComplete }) {
  const [status, setStatus] = useState("subscription");
  const [title, setTitle] = useState(null);
  const services = [...contracts, "finish"];

  const defineNext = () => {
    const index = services.indexOf(status);
    return services[index + 1];
  };

  const definePak = () => {
    if (status === "subscription") return subscription;
    if (status !== "qNa") return packs;
    return qNa;
  };

  useEffect(() => {
    setTitle(strings[status]);

    if (status === "finish") setIsComplete(true);
  }, [status]);

  return (
    <>
      <div className={classes.settings.contractForm}>
        <PriceDefiner
          key={status}
          strings={strings}
          lang={lang}
          setStatus={setStatus}
          status={status}
          title={title}
          next={defineNext()}
          packs={definePak()}
        />
      </div>
    </>
  );
}
