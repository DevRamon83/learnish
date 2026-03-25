export const fetchData = async (
  apiUrl,
  method,
  credentials,
  myData,
  options = {},
) => {
  const dataBody = myData !== undefined ? { ...myData } : {};
  console.log("myData ", myData);

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials,
      body: method !== "GET" ? JSON.stringify(dataBody) : null,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        error: true,
        errorMessage:
          errorData?.message || `Errore HTTP! Status: ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();

    return data;
  } catch (err) {
    return err.name === "AbortError"
      ? { error: true, aborted: true }
      : {
          error: true,
          errorMessage: err.message,
          status: err.response?.status || 500,
        };
  }
};
