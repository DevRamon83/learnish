export default function PeriodSelect({ setter, strings }) {
  return (
    <>
      <label>{strings.labelSelect}</label>
      <select
        name="selectPeriod"
        defaultValue="semiAnnually"
        onChange={(e) => setter(e.target.value)}
      >
        <option value="semiAnnually">{strings.semiAnnually}</option>
        <option value="quarter">{strings.quarter}</option>
        <option value="monthly">{strings.monthly}</option>
        <option value="weekly">{strings.weekly}</option>
      </select>
    </>
  );
}
