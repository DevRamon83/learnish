import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchAuth from "../api/handlers.js/fetchAuth";
import { setAuth, setUser } from "../redux/slices/authSlice";

export const useAuth = (dashboard) => {
  const [data, setData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  const fetch = async () => {
    const response = await fetchAuth();
    if (response.error) {
      setData(null);
    } else {
      setData(response);
      setIsAuth(true);
    }
  };

  useEffect(() => {
    if (!dashboard) fetch();
  }, []);

  useEffect(() => {
    dispatch(setUser(data));
    dispatch(setAuth(isAuth));
  }, [isAuth]);
};
