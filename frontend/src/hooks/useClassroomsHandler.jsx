import { useEffect, useState } from "react";

const useClassroomsHandler = (currentClassroom, students) => {
  const available = students
    .filter((student) => !student.classroom)
    .map((student) => student.username);

  const [free, setFree] = useState([]);

  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    setFree([...available]);
    if (!currentClassroom) return setEnrolled([]);

    const enrolledStudents = students
      .filter((student) => {
        const enrolledStudents = student.classroom?.join("-");
        if (enrolledStudents === currentClassroom) return student;
      })
      .map((student) => student.username);

    setEnrolled([...enrolledStudents]);
  }, [currentClassroom]);

  return {
    enrolled,
    setEnrolled,
    free,
    setFree,
  };
};

export default useClassroomsHandler;
