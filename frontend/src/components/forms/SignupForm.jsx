import bundle from "../../../../shared";
import { signupConfig } from "../../configs/inputs/auth";
import { useI18nFormSchema } from "../../hooks/factories/useI18nFormSchema";
import { useStateFactory } from "../../hooks/factories/useStateFactory";
import InputField from "../inputs/InputField";

const { username, email, password, confirmPassword } = signupConfig;

const SSOT = [username.id, email.id, password.id, confirmPassword.id];

const basicConfig = {
  targetKeys: SSOT,
  originalObjects: [username, email, password, confirmPassword],
  addThisKeys: ["label", "placeholder"],
  stringsAddress: "components.auth",
};

const stateConfig = {
  params: SSOT,
  refIndexes: [null],
  stateIndexes: [0, 1, 2, 3],
};

export default function SignupForm() {
  const inputsData = useI18nFormSchema(basicConfig);

  const { cloneInterface } = bundle.utils;

  const [states, setter] = useStateFactory(stateConfig);

  for (let i = 0; i < SSOT.length; i++) {
    if (!inputsData) return;
    inputsData[SSOT[i]].inputProps = { value: states[SSOT[i]] };
    // missing ref handlers
  }

  return (
    <>
      {inputsData && (
        <form>
          {SSOT.map((id) => (
            <InputField key={id} dataField={inputsData[id]} />
          ))}
        </form>
      )}
    </>
  );
}
