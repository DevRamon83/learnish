import getPicUrl from "../../helpers/getPicUrl";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { useSelector } from "react-redux";

export default function YourStudents() {
  const { strings } = useLang(i18nAddresses.dashboard);
  const students = useSelector((state) => state.auth.user.studentsList);

  const imgHandler = (data) => {
    if (!data.profilePic) return "/noPic.svg";
    return getPicUrl(data);
  };

  return (
    <div className="settings__myStudents">
      <h1>{strings.yourStudents}</h1>
      {students.length > 0 ? (
        students.map((student) => (
          <div className="settings__student" key={student._id}>
            <img src={imgHandler(student)} />
            {student.username}
          </div>
        ))
      ) : (
        <>
          <h4>{strings.zeroStudents}</h4>
          <h5>{strings.checkSettings}</h5>
        </>
      )}
    </div>
  );
}
