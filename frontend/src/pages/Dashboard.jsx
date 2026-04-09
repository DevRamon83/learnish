import { useEffect, useState } from "react";
import TabMenu from "../components/dashboard/TabMenu";
import Exercises from "../components/dashboard/Exercises";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import fetchLogout from "../api/handlers.js/fetchLogout";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../redux/slices/authSlice";

export default function Dashboard() {
  const { strings, lang } = useLang(i18nAddresses.dashboard);
  const dispatch = useDispatch();
  const exercisesTab = strings.exercisesTab;
  const [tabMenu, setTabMenu] = useState("study");

  const logoutHandler = async () => {
    const response = await fetchLogout();
    if (response.error) {
      console.error(response.errorMsg);
    } else {
      dispatch(setUser(null));
      dispatch(setAuth("unauthenticated"));
    }
  };

  useEffect(() => {
    if (tabMenu === "logout") {
      logoutHandler();
    }
  }, [tabMenu]);

  return (
    <main>
      <TabMenu setTabMenu={setTabMenu} tabMenu={tabMenu} />
      <div className="dashboard">
        {tabMenu === "esercizi" && <Exercises exercisesTab={exercisesTab} />}
      </div>
    </main>
  );
}
