import { useState } from "react";
import fetchSummaries from "../../../api/handlers/fetchSummaries";
import SummaryCard from "./SummaryCard";
import FetchObserver from "../../../api/FetchObserver";
import NewSummary from "./NewSummary";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useHideOverflow } from "../../../hooks/useHideOverflow";
import useFetchData from "../../../hooks/useFetchData";
import { classes } from "../../../constants/layout/dashboard";

export default function Summaries() {
  const [panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);
  const { strings, lang } = useLang(i18nAddresses.summary);
  useHideOverflow(open);
  const { fetchStatus, setRetry, data } = useFetchData(fetchSummaries);

  return (
    <>
      <h1>{strings.yourSummaries}</h1>
      <button onClick={() => setPanel(true)}>{strings.newSummaryBtn}</button>

      <FetchObserver
        fetchStatus={fetchStatus}
        caller={strings.summary}
        setRetry={setRetry}
      />

      <div className={classes.summary.list}>
        {data &&
          data.map((summary) => (
            <SummaryCard
              key={summary._id}
              summary={summary}
              open={open}
              setter={setOpen}
            />
          ))}
      </div>

      <NewSummary
        panel={panel}
        setPanel={setPanel}
        strings={strings}
        lang={lang}
      />
    </>
  );
}
