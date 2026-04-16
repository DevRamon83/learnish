import { useState } from "react";
import { useParseSummary } from "../../../hooks/useParseSummary";
import ShowSummary from "../../../ui/ShowSummary";

export default function Summary({ data, setter }) {
  const { parse, isInvalid } = useParseSummary(data.aiText);
  const [toggle, setToggle] = useState(null);
  const [mistake, setMistake] = useState(null);
  const tooltipHandler = (del) => {
    if (del === toggle) {
      setToggle(null);
      setMistake(null);
    } else {
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
        <div>
          {mistake && <p className="summary__explain">{mistake.explain}</p>}
        </div>
        <div onClick={() => setter(false)}>Chiudi</div>
      </div>
    </div>
  );
}
