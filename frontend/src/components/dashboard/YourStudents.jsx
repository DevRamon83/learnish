import { useEffect, useState } from "react";
import fetchStudents from "../../api/handlers/fetchStudents";
import getPicUrl from "../../helpers/getPicUrl";

export default function YourStudents() {
  const [students, setStudents] = useState([]);

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
      {students.length > 0 ? (
        students.map((student) => (
          <div className="settings__student" key={student._id}>
            <img src={imgHandler(student)} />
            {student.username}
          </div>
        ))
      ) : (
        <div>Non hai ancora studenti iscritti</div>
      )}
    </div>
  );
}
