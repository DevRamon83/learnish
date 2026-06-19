import getPicUrl from "../../helpers/getPicUrl";

export default function TeacherPic({ teacher }) {
  return (
    <div className="settings__teacherPic">
      <img src={getPicUrl(teacher)} />
    </div>
  );
}
