import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const useTabRouting = (setCurrentTab) => {
  const user = useSelector((state) => state.auth.user);

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab");
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialTab) return;
    setCurrentTab(initialTab);
    navigate(`/user/${user.type}/${user.id}`);
  }, [initialTab]);
};

export default useTabRouting;
