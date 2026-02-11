import { signupConfig } from "../../configs/inputs/auth";
import InputField from "../inputs/InputField";
import { useFormFactory } from "../../hooks/factories/useFormFactory";

const factoryConfig = {
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
  const formConfig = useFormFactory(factoryConfig);

  return (
    <>
      {formConfig && (
        <form>
          <InputField dataField={formConfig.username} />
          <InputField dataField={formConfig.email} />
          <InputField dataField={formConfig.password} />
          <InputField dataField={formConfig.passwordCheck} />
        </form>
      )}
    </>
  );
}
