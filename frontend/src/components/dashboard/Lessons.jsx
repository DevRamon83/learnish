import { useEffect, useState } from "react";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";
import UnlockLesson from "./UnlockLesson";
import ReadLesson from "./ReadLesson";
import { useUnlockedLessons } from "../../hooks/useUnlockedLessons";
import { classes } from "../../constants/components/dashboard";

export default function Lessons() {
  const { strings } = useLang(i18nAddresses.englishLessons);
  const errorsStrings = useLang(i18nAddresses.errors);
  const { userLessons, setUserLessons } = useUnlockedLessons();
  const [error, setError] = useState(null);
  const urls = Array.from(strings.keys());

  return (
    <div className={classes.lessons.container}>
      {userLessons &&
        urls.map((url) => (
          <div className={classes.lessons.row} key={url}>
            <div className={classes.lessons.level}>
              {strings.get(url).level}
            </div>
            <div className={classes.lessons.title}>
              {strings.get(url).title}
            </div>
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
        <div className={classes.lessons.error}>
          <div className={classes.lessons.errorMsg}>
            {errorsStrings.strings[error]}
          </div>
          <div
            onClick={() => setError(null)}
            className={classes.lessons.errorClose}
          >
            {errorsStrings.strings.close}
          </div>
        </div>
      )}
    </div>
  );
}
