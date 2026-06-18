import { useEffect, useState } from "react";
import fetchTeachers from "../api/handlers/fetchTeachers";
import { useHideOverflow } from "../hooks/useHideOverflow";
import useScrollToTop from "../hooks/useScrollToTop";
import getPicUrl from "../helpers/getPicUrl";

export default function TeachersList({ setChangeTeacher }) {
  const [teachers, setTeachers] = useState([]);
  useHideOverflow(true);
  useScrollToTop();

  useEffect(() => {
    const controller = new AbortController();

    const retrive = async () => {
      const res = await fetchTeachers(controller.signal);
      console.log("res ", res);
      if (res.error) {
        // error handler
      } else {
        setTeachers([...res]);
      }
    };

    retrive();

    return () => controller.abort();
  }, []);

  console.log(teachers);
  return (
    <div className="settings__teachersList">
      <p>list</p>
      {teachers.map((teacher) => (
        <div key={teacher._id}>
          <img src={getPicUrl(teacher)} />
          <div>{teacher.username}</div>
        </div>
      ))}
      <div onClick={() => setChangeTeacher(false)}>X</div>
    </div>
  );
}
