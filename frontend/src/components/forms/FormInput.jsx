import { useEffect, useState } from "react";
import authErrorHandler from "./authErrorHandler";

export default function FormInput({ Element, data, lang }) {
  let error = authErrorHandler(data.returns);
  const [onBlurError, setOnBlurError] = useState(null);

  if (data.state.value === "") {
    error = null;
  }

  useEffect(() => {
    if (error) return;
    const result = data.returns.onBlur;

    if (result instanceof Promise) {
      result.then((resolvedValue) => {
        const onBlur = resolvedValue.error ? resolvedValue.errorMsg : null;
        setOnBlurError(onBlur);
      });
    } else if (result && result.error) {
      setOnBlurError(result.errorMsg);
    }
  }, [data.returns?.onBlur]);

  useEffect(() => {
    if (onBlurError) {
      setOnBlurError(null);
    }
  }, [data.returns?.onChange]);

  return (
    <div style={{ display: "flex" }}>
      {<Element dataField={data} i18n={lang} />}
      {error && <div>{error}</div>}
      {onBlurError && <div>{onBlurError}</div>}
    </div>
  );
}
