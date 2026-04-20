export default function SummaryOpenBtn({ id, setter }) {
  return (
    <div className="summary__iconRead" onClick={() => setter(id)}>
      <img src="/read.svg" />
    </div>
  );
}
