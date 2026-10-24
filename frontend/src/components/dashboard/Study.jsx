import { useState } from "react";
import StudyMenu from "./StudyMenu";
import Summaries from "./summaries/Summaries";
import Lessons from "./Lessons";
import Flashcards from "./Flashcards";
import Exercises from "./exercises/Exercises";

export default function Study() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <StudyMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && <Lessons />}
      {activeTab === 1 && <Summaries />}
      {activeTab === 2 && <Flashcards />}
      {activeTab === 3 && <Exercises />}
    </>
  );
}
