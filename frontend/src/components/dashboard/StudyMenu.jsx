import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";

export default function StudyMenu({ activeTab, setActiveTab }) {
  const { strings } = useLang(i18nAddresses.dashboard);
  const tabs = strings.tabs;

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
