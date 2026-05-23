import { useEffect, useState } from "react";
import fetchLessons from "../../api/handlers/fetchLessons";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";
import UnlockLesson from "./UnlockLesson";

export default function Lessons() {
  const { strings } = useLang(i18nAddresses.englishLessons);
  const errorsStrings = useLang(i18nAddresses.errors);
  const [userLessons, setUserLessons] = useState(null);
  const [error, setError] = useState(null);
  const urls = Object.keys(strings);
  useEffect(() => {
    const controller = new AbortController();

    const lessons = async () => {
      const resp = await fetchLessons(controller.signal);
      if (resp.error) {
        // error handler
      } else {
        setUserLessons(resp.unlocked);
      }
    };

    lessons();
    return () => controller.abort();
  }, []);

  return (
    <div className="dashboard__lessonsContainer">
      {userLessons &&
        urls.map((url) => (
          <div className="dashboard__lessonRow" key={url}>
            <div className="dashboard__lessonLevel">{strings[url].level}</div>
            <div>{strings[url].title}</div>
            <div>
              {userLessons.includes(strings[url].index) ? (
                "leggi"
              ) : (
                <UnlockLesson
                  index={strings[url].index}
                  level={strings[url].level}
                  lessonsSetter={setUserLessons}
                  errorSetter={setError}
                />
              )}
            </div>
          </div>
        ))}
      {error && (
        <div className="dashboard__lessonError">
          <div className="dashboard__lessonError-msg">
            {errorsStrings.strings[error]}
          </div>
          <div
            onClick={() => setError(null)}
            className="dashboard__lessonError-close"
          >
            {errorsStrings.strings.close}
          </div>
        </div>
      )}
    </div>
  );
}
