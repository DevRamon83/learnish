export default function StudyMenu({ activeTab, setActiveTab }) {
  const tabs = ["lezioni", "sommari", "flashcards", "esercizi"];
  return (
    <ul className="dashboard__studyMenu">
      {tabs.map((tab, index) => (
        <li
          key={tab}
          onClick={() => setActiveTab(index)}
          className={
            activeTab === index
              ? "dashboard__studyMenu-tabActive"
              : "dashboard__studyMenu-tab"
          }
        >
          {tab}
        </li>
      ))}
    </ul>
  );
}
