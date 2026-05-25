import { classes } from "../../constants/components/dashboard";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";

export default function StudyMenu({ activeTab, setActiveTab }) {
  const { strings } = useLang(i18nAddresses.dashboard);
  const tabs = strings.tabs;

  return (
    <ul className={classes.study.menu}>
      {tabs.map((tab, index) => (
        <li
          key={tab}
          onClick={() => setActiveTab(index)}
          className={
            activeTab === index ? classes.study.activeTab : classes.study.tab
          }
        >
          {tab}
        </li>
      ))}
    </ul>
  );
}
