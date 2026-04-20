import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";

export default function SummaryCardErrors({
  errorCount,
  currentError,
  summary,
}) {
  const { lang, strings } = useLang(i18nAddresses.errors);
  const words = summary.summary.split(" ").length;
  const ratio = (summary.errorCodes.length / words) * 100;
  const grammar =
    summary.errorCodes.length === 1 ? strings.error : strings.errors;

  return (
    <>
      <div>
        {summary.errorCodes.length} {grammar} in {words} {strings.words}
      </div>
      <div>
        {strings[currentError]}: {errorCount}
      </div>
      <div>
        {strings.average}: {ratio.toFixed(1)} {strings.ratio}
      </div>
    </>
  );
}
