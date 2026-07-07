import Currency from "../../components/dashboard/settings/Currency";
import Email from "../../components/dashboard/settings/Email";
import Password from "../../components/dashboard/settings/Password";
import Pic from "../../components/dashboard/settings/Pic";
import Plan from "../../components/dashboard/settings/Plan";
import TeacherContract from "../../components/dashboard/settings/TeacherContract";

export default function SettingsCommon({ props, picProps, planProps }) {
  const { card } = props;

  return (
    <>
      {card === "Pic" && <Pic props={props} picProps={picProps} />}
      {card === "Email" && <Email props={props} />}
      {card === "Password" && <Password props={props} />}
      {card === "Plan" && <Plan props={props} planProps={planProps} />}
    </>
  );
}
