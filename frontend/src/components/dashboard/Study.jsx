import { useState } from "react";
import { classes } from "../../constants/layout/dashboard";
import StudyMenu from "./StudyMenu";
import Summaries from "./summaries/Summaries";

export default function Study() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <StudyMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={classes.dashPanel}></div>
      {activeTab === 1 && <Summaries />}
    </>
  );
}
