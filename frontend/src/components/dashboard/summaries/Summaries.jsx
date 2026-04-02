import { useState } from "react";
import fetchSummaries from "../../../api/handlers.js/fetchSummaries";
import { useEffect } from "react";
import SummaryCard from "../../../ui/SummaryCard";

export default function Summaries() {
  const [summaries, setSummaries] = useState(null);
  const [panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      const data = await fetchSummaries(controller.signal);
      if (data.error) {
        // handle error
        return;
      }
      console.log("data ", data);
      setSummaries(data);
    };

    loadData();

    return () => controller.abort();
  }, []);

  return (
    <>
      {!panel && (
        <>
          <h1>i tuoi sommari</h1>
          <button onClick={() => setPanel(true)}>Nuovo sommario</button>

          {!summaries || summaries.length === 0 ? (
            <p>Nessun sommario</p>
          ) : (
            summaries.map((summary) => (
              <SummaryCard
                key={summary._id}
                summary={summary}
                open={open}
                setter={setOpen}
              />
            ))
          )}
        </>
      )}

      {panel && <NewSummary panel={panel} setPanel={setPanel} />}
    </>
  );
}
