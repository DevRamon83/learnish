export const fetchData = async (
  apiUrl,
  method,
  credentials,
  myData,
  options = {},
) => {
  const dataBody = myData !== undefined ? { ...myData } : {};
  const isFormData = myData instanceof FormData;
  let body = method !== "GET" ? JSON.stringify(dataBody) : null;

  if (isFormData) {
    body = myData;
  }

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: isFormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },
      credentials,
      body,
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
