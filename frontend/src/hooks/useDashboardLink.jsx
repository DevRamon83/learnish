import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashboardLink = () => {
  const user = useSelector((state) => state.auth.user);
  const [dashboardLink, setDashboardLink] = useState(null);

  useEffect(() => {
    const link = "/dashboard/" + user?.id;
    user && setDashboardLink(link);
  }, [user]);

  return { dashboardLink, setDashboardLink };
};
