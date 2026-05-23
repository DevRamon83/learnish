import { useState } from "react";
import StudyMenu from "./StudyMenu";
import Summaries from "./summaries/Summaries";
import Lessons from "./Lessons";

export default function Study() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <StudyMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && <Lessons />}
      {activeTab === 1 && <Summaries />}
    </>
  );
}
