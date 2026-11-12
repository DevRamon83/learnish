export default function StudentManagerTabMenu({
  classes,
  teacherTabs,
  setTab,
  tab,
  strings,
}) {
  const { tabsContainer, tabBase } = classes.studentManager;

  return (
    <div className={tabsContainer}>
      {teacherTabs.map((currentTab) => (
        <button
          className={`${tabBase}${currentTab === tab ? "-active" : ""}`}
          onClick={() => setTab(currentTab)}
          key={currentTab}
        >
          {strings[currentTab]}
        </button>
      ))}
    </div>
  );
}
