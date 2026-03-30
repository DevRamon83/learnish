import { Student, Teacher } from "../../models/user.js";

const defineModel = (data) => {
  if (!data.userType || data.userType === "studente") {
    return Student;
  }

  return Teacher;
};

export default defineModel;
