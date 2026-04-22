import { useEffect, useState } from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import Study from "../components/dashboard/Study";
import fetchLogout from "../api/handlers/fetchLogout";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../redux/slices/authSlice";
import useRetriveStats from "../hooks/useRetriveStats";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("study");
  useRetriveStats();

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
    <main className="dashboard__main">
      <DashboardMenu setCurrent={setCurrent} current={current} />
      <div className="dashboard">{current === "study" && <Study />}</div>
    </main>
  );
}
