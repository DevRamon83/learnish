import { useEffect, useState } from "react";
import fetchStudents from "../../api/handlers/fetchStudents";
import getPicUrl from "../../helpers/getPicUrl";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";

export default function YourStudents() {
  const [students, setStudents] = useState([]);
  const { strings } = useLang(i18nAddresses.dashboard);

  useEffect(() => {
    const controller = new AbortController();

    const loadStudents = async () => {
      const res = await fetchStudents(controller.signal);

      if (res.error) {
        // error handler
      } else {
        setStudents(res);
      }
    };

    loadStudents();

    return () => controller.abort();
  }, []);

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
