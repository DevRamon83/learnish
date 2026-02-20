import { commonsConfig } from "../../configs/forms/signup/commonsSignup";
import { fieldsLogic } from "../../configs/forms/signup/fieldsSignup";
import { groupsLogic } from "../../configs/forms/signup/groupsSignup";
import { selectsLogic } from "../../configs/forms/signup/selectsSignup";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../../ui/inputs/InputField";
import InputGroup from "../../ui/inputs/InputGroup";
import SelectInput from "../../ui/inputs/SelectInput";

export default function SignupForm() {
  const customLogic = {
    ...fieldsLogic,
    ...groupsLogic,
    ...selectsLogic,
    commonsConfig,
  };

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
