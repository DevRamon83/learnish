import { useEffect, useState } from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import Exercises from "../components/dashboard/Exercises";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import fetchLogout from "../api/handlers/fetchLogout";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../redux/slices/authSlice";

export default function Dashboard() {
  const { strings, lang } = useLang(i18nAddresses.dashboard);
  const dispatch = useDispatch();
  const exercisesTab = strings.exercisesTab;
  const [current, setCurrent] = useState("study");

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
    if (current === "logout") {
      logoutHandler();
    }
  }, [current]);

  return (
    <main>
      <DashboardMenu setCurrent={setCurrent} current={current} />
      <div className="dashboard">
        {current === "esercizi" && <Exercises exercisesTab={exercisesTab} />}
      </div>
    </main>
  );
}
