import fetchLogout from "../api/handlers/fetchLogout";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { getSocket } from "../socket/socketClient";
import { useNavigate } from "react-router-dom";

export default function useLogout(setNotify) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await fetchLogout();
    if (response.error) {
      setNotify(response.errorMsg);
    } else {
      const socket = getSocket();
      socket && socket.disconnect();
      dispatch(logout());
      navigate("/");
    }
  };

  return { logoutHandler };
}
