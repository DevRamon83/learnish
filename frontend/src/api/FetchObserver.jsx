import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";

export default function FetchObserver({ fetchStatus, caller, setRetry }) {
  const { strings } = useLang(i18nAddresses.errors);

  return (
    <>
      {fetchStatus === "void" && (
        <div>
          {strings.nothing} {caller} {strings.present}
        </div>
      )}
      {fetchStatus === "fail" && (
        <div>
          <p>{strings.connection}</p>
          <button onClick={() => setRetry((prev) => prev + 1)}>
            {strings.tryAgain}
          </button>
        </div>
      )}
    </>
  );
}
