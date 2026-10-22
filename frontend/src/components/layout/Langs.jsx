import { classes } from "../../constants/layout/navbar";
import { setLanguage } from "../../redux/slices/settingsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Langs() {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.settings.language);
  const langs = ["italian", "spanish", "french", "english"];
  const changeLang = (lang) => {
    dispatch(setLanguage(lang));
    const settingsString = localStorage.getItem("settings");

    if (settingsString) {
      const settings = JSON.parse(settingsString);
      settings.language = lang;
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  };

  return (
    <div className={classes.langsContainer}>
      {langs.map((lang) => (
        <div
          key={`newLang_${lang}`}
          className={currentLang === lang ? classes.langActive : classes.lang}
        >
          <img
            alt={lang}
            title={lang}
            src={`/langs/${lang}.svg`}
            onClick={() => changeLang(lang)}
            className={classes.langIcon}
          />
        </div>
      ))}
    </div>
  );
}
