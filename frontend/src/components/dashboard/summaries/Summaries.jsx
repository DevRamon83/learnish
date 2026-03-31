import { useState } from "react";
import fetchSummaries from "../../../api/handlers.js/fetchSummaries";
import { useEffect } from "react";
import NewSummary from "./NewSummary";

export default function Summaries() {
  const [summaries, setSummaries] = useState(null);
  const [panel, setPanel] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      const data = await fetchSummaries(controller.signal);
      if (data.error) {
        // handle error
        return;
      }
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
              <div key={summary.id}>{summary.title}</div>
            ))
          )}
        </>
      )}

      {panel && <NewSummary panel={panel} setPanel={setPanel} />}
    </>
  );
}
