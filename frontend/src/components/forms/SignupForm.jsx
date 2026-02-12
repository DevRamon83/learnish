import { signupConfig } from "../../configs/inputs/auth";
import { useI18nFormSchema } from "../../hooks/factories/useI18nFormSchema";
import InputField from "../inputs/InputField";

const basicConfig = {
  targetKeys: ["username", "email", "psw", "confirmPassword"],
  originalObjects: [
    signupConfig.username,
    signupConfig.email,
    signupConfig.psw,
    signupConfig.confirmPassword,
  ],
  addThisKeys: ["label", "placeholder"],
  stringsAddress: "components.auth",
};

export default function SignupForm() {
  const inputsData = useI18nFormSchema(basicConfig);

  return (
    <>
      {inputsData && (
        <form>
          <InputField dataField={inputsData.username} />
          <InputField dataField={inputsData.email} />
          <InputField dataField={inputsData.password} />
          <InputField dataField={inputsData.passwordCheck} />
        </form>
      )}
    </>
  );
}
