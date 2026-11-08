import { classes } from "../constants/pages/home";

export default function HomeSectionZ({ strings, side, protagonist }) {
  const stringKey = protagonist === "students" ? "forStudents" : "forTeachers";
  const { teachersCatchPhrase, studentsCatchPhrase } = strings;
  const catchPhraseString =
    protagonist === "students" ? studentsCatchPhrase : teachersCatchPhrase;
  const { catchPhrase, zContainer, imgZ, textZ } = classes;
  return (
    <>
      <h3 className={`${catchPhrase}-${protagonist}`}>{catchPhraseString}</h3>
      <div className={`${zContainer}-${protagonist}`}>
        <div className={`${imgZ}-${side}`}>
          <img src={`/${protagonist}.jpeg`} />
        </div>
        <div className={textZ}>{strings[stringKey]}</div>
      </div>
    </>
  );
}
