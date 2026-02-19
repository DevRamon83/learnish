import { fieldsLogic, groupsLogic } from "../../configs/forms/signupConfig";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../inputs/InputField";
import InputGroup from "../inputs/InputGroup";

export default function SignupForm() {
  const customLogic = { ...fieldsLogic, ...groupsLogic };

  const { fields, groups } = useFormFactory(customLogic);

  return (
    <>
      {fields && (
        <form>
          {fieldsLogic.fieldsSSOT.map((id) => (
            <InputField key={id} dataField={fields[id]} />
          ))}
          {groupsLogic.groupsSSOT.map((id) => (
            <InputGroup key={id} dataField={groups[id]} />
          ))}
        </form>
      )}
    </>
  );
}
