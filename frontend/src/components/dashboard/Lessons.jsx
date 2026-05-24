import { useEffect, useState } from "react";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";
import UnlockLesson from "./UnlockLesson";
import ReadLesson from "./ReadLesson";
import { useUnlockedLessons } from "../../hooks/useUnlockedLessons";

export default function Lessons() {
  const { strings } = useLang(i18nAddresses.englishLessons);
  const errorsStrings = useLang(i18nAddresses.errors);
  const { userLessons, setUserLessons } = useUnlockedLessons();
  const [error, setError] = useState(null);
  const urls = Array.from(strings.keys());

  return (
    <div className="dashboard__lessonsContainer">
      {userLessons &&
        urls.map((url) => (
          <div className="dashboard__lessonRow" key={url}>
            <div className="dashboard__lessonLevel">
              {strings.get(url).level}
            </div>
            <div>{strings.get(url).title}</div>
            <div>
              {userLessons.includes(strings.get(url).index) ? (
                <ReadLesson url={url} />
              ) : (
                <UnlockLesson
                  index={strings.get(url).index}
                  level={strings.get(url).level}
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
