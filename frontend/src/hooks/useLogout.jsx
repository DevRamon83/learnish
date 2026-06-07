import fetchLogout from "../api/handlers/fetchLogout";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../redux/slices/authSlice";
import { useEffect } from "react";

export default function useLogout(currentTab) {
  const dispatch = useDispatch();

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
    if (currentTab === "logout") {
      logoutHandler();
    }
  }, [currentTab]);

  return { logoutHandler };
}
