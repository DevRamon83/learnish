import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAuth from "../api/handlers.js/fetchAuth";
import { setAuth, setUser } from "../redux/slices/authSlice";

export const useAuth = () => {
  const authRedux = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();

  const fetch = async () => {
    const response = await fetchAuth();
    if (response.error) {
      dispatch(setAuth("unauthenticated"));
    } else {
      dispatch(setUser(response));
      dispatch(setAuth("authenticated"));
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return authRedux;
};
