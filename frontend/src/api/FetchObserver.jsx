export default function FetchObserver({ fetchStatus, caller, setRetry }) {
  return (
    <>
      {fetchStatus === "void" && <div>Nessun {caller} presente</div>}
      {fetchStatus === "fail" && (
        <div>
          <p>Errore di connessione</p>
          <button onClick={() => setRetry((prev) => prev + 1)}>Riprova</button>
        </div>
      )}
    </>
  );
}
