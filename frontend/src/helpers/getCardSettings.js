const getCardSettings = (userType) => {
  const commonsCards = ["Pic", "Email", "Password"];
  const studentCards = [...commonsCards, "MyTeacher", "Plan"];
  const teacherCards = [...commonsCards, "Currency", "Contracts", "Plan"];

  return userType === "student" ? studentCards : teacherCards;
};

export default getCardSettings;
