import { emailValidator } from "ramon-vanilla";

const messageValidator = (data) => {
  if (!data) return { error: true, errorMsg: "missingData" };
  const isValidEmail = emailValidator(data.email);

  if (isValidEmail.error) return { error: true, errorMsg: "invalidEmail" };

  const words = data.message.split(" ");

  if (words < 10) return { error: true, errorMsg: "msgTooShort" };
  if (words > 500) return { error: true, errorMsg: "msgTooLong" };

  const validTime = typeof data.time === "number";
  if (!validTime) return { error: true, errorMsg: "invalidTime" };
  if (data.time < 3000) return { error: true, errorMsg: "botAlert" };

  return { error: false };
};

export default messageValidator;
