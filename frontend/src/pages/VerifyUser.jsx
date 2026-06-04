import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchConfirmationToken from "../api/handlers/fetchConfirmationToken";
import { useState } from "react";
import { useDispatch } from "react-redux";
import finalizeAuth from "../utils/finalizeAuth";
import { setAuth, setUser } from "../redux/slices/authSlice";

export default function VerifyUser() {
  const { token } = useParams();
  const [error, setError] = useState(null);
  const verifyRef = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const standardError = "This verification link is invalid or has expired";

  useEffect(() => {
    const controller = new AbortController();
    const verifyEmail = async () => {
      if (!verifyRef.current) return;

      verifyRef.current = false;

      setError(null);
      dispatch(setAuth("pending"));
      const response = await fetchConfirmationToken(token, controller.signal);
      console.log(response);
      if (response.error) {
        setError("invalid link");
      }

      const config = { dispatch, navigate, setAuth, setUser, standardError };
      finalizeAuth(response, config, setError);
      return () => controller.abort();
    };

    verifyRef.current && verifyEmail();
  }, []);

  return (
    <div>
      <p>Verifica email</p>
      {error}
    </div>
  );
}
