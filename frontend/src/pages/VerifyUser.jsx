import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchConfirmationToken from "../api/handlers/fetchConfirmationToken";
import { useState } from "react";
import { useDispatch } from "react-redux";
import finalizeAuth from "../utils/finalizeAuth";
import { setAuth, setUser } from "../redux/slices/authSlice";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";

export default function VerifyUser() {
  const { token } = useParams();
  const [error, setError] = useState(null);
  const verifyRef = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { strings, lang } = useLang(i18nAddresses.errors);

  const standardError = "This verification link is invalid or has expired";

  useEffect(() => {
    const controller = new AbortController();
    const verifyEmail = async () => {
      if (!verifyRef.current) return;

      verifyRef.current = false;

      setError(null);
      dispatch(setAuth("pending"));
      const response = await fetchConfirmationToken(token, controller.signal);
      console.log("data ", response);
      if (response.error) {
        setError(standardError);
      }

      const config = { dispatch, navigate, setAuth, setUser, strings };
      finalizeAuth(response, config, setError);
      return () => controller.abort();
    };

    verifyRef.current && verifyEmail();
  }, []);

  return <div>{error}</div>;
}
