import { useState } from "react";
import fetchSummaries from "../../../api/handlers/fetchSummaries";
import SummaryCard from "./SummaryCard";
import FetchObserver from "../../../api/FetchObserver";
import NewSummary from "./NewSummary";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useHideOverflow } from "../../../hooks/useHideOverflow";
import useFetchSummariesAndStats from "../../../hooks/useFetchSummariesAndStats";
import { classes } from "../../../constants/components/dashboard";

export default function Summaries() {
  const [panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);
  const { strings, lang } = useLang(i18nAddresses.summary);
  useHideOverflow(open);

  // NOTE: This hook orchestrates a synchronized fetch of both summaries and global
  //       statistics.
  // 1. Redux Sync: 'allStats' is strictly required to refresh the global Redux store;
  //    omitting it will break downstream features across the app.
  // 2. Retry Mechanism: The 'retry' dependency serves a dual purpose:
  //    - It acts as a trigger to manually re-fetch data if the initial
  //      server response fails or times out.
  //    - It automatically re-fetches the dataset once a new summary is
  //      successfully created,
  //      ensuring the UI instantly updates with the new item.
  const { fetchStatus, setRetry, data } =
    useFetchSummariesAndStats(fetchSummaries);

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
              classes={classes}
            />
          ))}
      </div>

      <NewSummary
        panel={panel}
        setPanel={setPanel}
        strings={strings}
        lang={lang}
        setRetry={setRetry}
      />
    </>
  );
}
