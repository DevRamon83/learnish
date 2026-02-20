import {
  fieldsLogic,
  groupsLogic,
  selectsLogic,
} from "../../configs/forms/signupConfig";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../../ui/inputs/InputField";
import InputGroup from "../../ui/inputs/InputGroup";
import SelectInput from "../../ui/inputs/SelectInput";

export default function SignupForm() {
  const customLogic = { ...fieldsLogic, ...groupsLogic, ...selectsLogic };

  const { fields, groups, selects } = useFormFactory(customLogic);

  return (
    <>
      {fields && (
        <form>
          {fieldsLogic.fieldsSSOT.map((id) => (
            <InputField key={id} dataField={fields[id]} />
          ))}
          {selectsLogic.selectsSSOT.map((id) => (
            <SelectInput key={id} dataField={selects[id]} />
          ))}
          {groupsLogic.groupsSSOT.map((id) => (
            <InputGroup key={id} dataField={groups[id]} />
          ))}
        </form>
      )}
    </>
  );
}
