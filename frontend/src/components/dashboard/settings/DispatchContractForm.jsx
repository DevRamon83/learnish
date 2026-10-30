import { useEffect, useState } from "react";
import PriceDefiner from "../../forms/PriceDefiner";
import bundle from "shared";
import { classes } from "../../../constants/components/dashboard";
import fetchSettings from "../../../api/handlers/fetchSettings";
const { contracts, subscription, packs, qNa } = bundle.constants;

export default function DispatchContractForm({
  strings,
  lang,
  setIsComplete,
  contractRetrieve,
}) {
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

    if (status === "finish") {
      const controller = new AbortController();

      // NOTE: Uses the parent's config to refresh the data from the DB
      // and unlock the main active contract panel instantly.
      const retrieve = async () => {
        const { data, setter, key, strings } = contractRetrieve;

        const res = await fetchSettings(data, controller.signal);
        if (res.error) {
          // error handler
        } else {
          const value = res[key] ? res[key] : strings.change[key];
          setter(value);
        }
        setIsComplete(true);
      };
      retrieve();
    }
  }, [status]);

  return (
    <>
      <div className={classes.settings.contractForm}>
        <PriceDefiner
          key={`${status}${lang}`}
          strings={strings}
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
