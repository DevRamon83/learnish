import fetchUnlock from "../../api/handlers/fetchUnlock";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";

export default function UnlockLesson({
  index,
  level,
  lessonsSetter,
  errorSetter,
}) {
  const { strings } = useLang(i18nAddresses.dashboard);

  const unlock = async () => {
    const res = await fetchUnlock({ lessonIndex: index, level });
    console.log(res);
    if (res.error) {
      errorSetter(res.errorMessage);
    } else {
      lessonsSetter((prev) => [...prev, index]);
    }
  };

  return (
    <div className="dashboard__lessonUnlock" onClick={unlock}>
      {strings.unlock}
    </div>
  );
}
