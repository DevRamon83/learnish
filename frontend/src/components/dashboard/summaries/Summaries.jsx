import { useState } from "react";
import fetchSummaries from "../../../api/handlers/fetchSummaries";
import { useEffect } from "react";
import SummaryCard from "./SummaryCard";
import FetchObserver from "../../../api/FetchObserver";
import NewSummary from "./NewSummary";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useHideOverflow } from "../../../hooks/useHideOverflow";

export default function Summaries() {
  const [summaries, setSummaries] = useState(null);
  const [panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [retry, setRetry] = useState(0);
  const { strings, lang } = useLang(i18nAddresses.summary);
  useHideOverflow(open);
  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setFetchStatus(null);

      const data = await fetchSummaries(controller.signal);
      if (data.error) {
        setFetchStatus("fail");
        return;
      }

      if (data.length === 0) {
        setFetchStatus("void");
      } else {
        setFetchStatus(null);
        setSummaries(data);
      }
    };

    loadData();

    return () => controller.abort();
  }, [retry]);

  return (
    <>
      {!panel && (
        <>
          <h1>{strings.yourSummaries}</h1>
          <button onClick={() => setPanel(true)}>
            {strings.newSummaryBtn}
          </button>

          <FetchObserver
            fetchStatus={fetchStatus}
            caller={"sommario"}
            setRetry={setRetry}
          />

          <div className="dashboard__summaries">
            {summaries &&
              summaries.map((summary) => (
                <SummaryCard
                  key={summary._id}
                  summary={summary}
                  open={open}
                  setter={setOpen}
                />
              ))}
          </div>
        </>
      )}

      {panel && (
        <NewSummary
          panel={panel}
          setPanel={setPanel}
          strings={strings}
          lang={lang}
        />
      )}
    </>
  );
}
