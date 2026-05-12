import { classes } from "../constants/pages/home";

export default function HomeSectionZ({ strings, side, protagonist }) {
  const stringKey = protagonist === "student" ? "forStudents" : "forTeachers";
  const { catchPhrase, zContainer, imgZ, textZ } = classes;
  return (
    <>
      <h3 className={`${catchPhrase}-${protagonist}`}>
        {strings.teachersCatchPhrase}
      </h3>
      <div className={`${zContainer}-${protagonist}`}>
        <div className={`${imgZ}-${side}`}>
          <img src={`/${protagonist}.jpeg`} />
        </div>
        <div className={textZ}>{strings[stringKey]}</div>
      </div>
    </>
  );
}
