import { useState } from "react";
import { useParseSummary } from "../../../hooks/useParseSummary";
import ShowSummary from "../../../ui/summary/ShowSummary";
import { useSelector } from "react-redux";
import ShowSummaryDetails from "../../../ui/summary/ShowSummaryDetails";
import ExplainMistake from "../../../ui/summary/ExplainMistake";

export default function Summary({ data, setter }) {
  const { parse, isInvalid } = useParseSummary(data.aiText);
  const [toggle, setToggle] = useState(null);
  const [classMistake, setClassMistake] = useState(null);
  const [mistake, setMistake] = useState(null);
  const stats = useSelector((state) => state.stats);
  const tooltipHandler = (del) => {
    if (del === toggle) {
      setClassMistake(null);
      setToggle(null);
      setMistake(null);
    } else {
      setClassMistake("-open");
      setToggle(del);
      setMistake(data.mistakes[del]);
    }
  };

  return (
    <div className="summary__panel">
      <div className="summary__container">
        <h1>{data.title}</h1>
        <ShowSummary
          parse={parse}
          isInvalid={isInvalid}
          data={data}
          toggle={toggle}
          tooltipHandler={tooltipHandler}
        />
        <ExplainMistake mistake={mistake} classMistake={classMistake} />
        <div onClick={() => setter(false)}>Chiudi</div>
      </div>

      <ShowSummaryDetails data={data} stats={stats} />
    </div>
  );
}
