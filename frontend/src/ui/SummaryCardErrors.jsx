import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";

export default function SummaryCardErrors({
  currentCount,
  currentError,
  summary,
}) {
  const { lang, strings } = useLang(i18nAddresses.errors);

  return (
    <>
      <div>
        {strings.totalError}: {summary.errorCodes.length}
      </div>
      <div>
        {strings[currentError]}: {currentCount}
      </div>
    </>
  );
}
