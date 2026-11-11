const getClassroomPayload = (students, currentClassroom, enrolled) => {
  const payload = {};

  for (let i = 0; i < students.length; i++) {
    const currentStudent = students[i];
    const isSelectedInUi = enrolled.includes(currentStudent.username);
    const currentDbClassroom = currentStudent.classroom?.join("-");
    const wasAlreadyEnrolledInDb = currentDbClassroom === currentClassroom;

    const noChangeNeeded = isSelectedInUi && wasAlreadyEnrolledInDb;
    if (noChangeNeeded) continue;

    const isNewEnrollment = isSelectedInUi && !wasAlreadyEnrolledInDb;
    if (isNewEnrollment) {
      payload[currentStudent._id] = true;
      continue;
    }

    if (!currentStudent.classroom) continue;

    const hasBeenDumped = !isSelectedInUi && wasAlreadyEnrolledInDb;
    if (hasBeenDumped) {
      payload[currentStudent._id] = false;
      continue;
    }
  }

  return payload;
};

export default getClassroomPayload;
