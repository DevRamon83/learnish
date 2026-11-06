import getPicUrl from "../../helpers/getPicUrl";

export default function TeacherPic({ teacher, classes }) {
  return (
    <div className={classes.teacherPic}>
      <img src={getPicUrl(teacher)} />
    </div>
  );
}
