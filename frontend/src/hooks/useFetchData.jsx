import { useEffect, useState } from "react";

const useFetchData = (fetchHandler) => {
  const [fetchStatus, setFetchStatus] = useState(null);
  const [retry, setRetry] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setFetchStatus(null);

      const res = await fetchHandler(controller.signal);
      if (res.error) {
        setFetchStatus("fail");
        return;
      }

      if (res.length === 0) {
        setFetchStatus("void");
      } else {
        setFetchStatus(null);
        setData(res);
      }
    };

    loadData();

    return () => controller.abort();
  }, [retry]);

  return { fetchStatus, setFetchStatus, retry, setRetry, data, setData };
};

export default useFetchData;
