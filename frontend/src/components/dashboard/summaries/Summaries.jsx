import { useState } from "react";
import fetchSummaries from "../../../api/handlers.js/fetchSummaries";
import { useEffect } from "react";
import SummaryCard from "../../../ui/SummaryCard";
import FetchObserver from "../../../api/FetchObserver";

export default function Summaries() {
  const [summaries, setSummaries] = useState(null);
  const [panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [retry, setRetry] = useState(0);

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
          <h1>i tuoi sommari</h1>
          <button onClick={() => setPanel(true)}>Nuovo sommario</button>

          <FetchObserver
            fetchStatus={fetchStatus}
            caller={"sommario"}
            setRetry={setRetry}
          />

          {summaries &&
            summaries.map((summary) => (
              <SummaryCard
                key={summary._id}
                summary={summary}
                open={open}
                setter={setOpen}
              />
            ))}
        </>
      )}

      {panel && <NewSummary panel={panel} setPanel={setPanel} />}
    </>
  );
}
