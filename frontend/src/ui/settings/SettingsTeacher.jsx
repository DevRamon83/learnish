import Currency from "../../components/dashboard/settings/Currency";
import TeacherContract from "../../components/dashboard/settings/TeacherContract";

export default function SettingsTeacher({ props, contractProps }) {
  const { card } = props;

  return (
    <>
      {card === "Currency" && <Currency props={props} />}

      {card === "Contracts" && (
        <TeacherContract props={props} contractProps={contractProps} />
      )}
    </>
  );
}
