import Email from "../../components/dashboard/settings/Email";
import Password from "../../components/dashboard/settings/Password";
import Pic from "../../components/dashboard/settings/Pic";
import Plan from "../../components/dashboard/settings/Plan";

// NOTE: WET (Write Everything Twice) Principle Exception
// Do NOT attempt to abstract or unify the common setting components
// While they share a similar layout shell, their internal mechanisms are
// fundamentally unique: they handle raw files, multi-field libraries,
// custom validations, and distinct Redux store mutations.
// Premature abstraction here would lead to an unmaintainable,
// tightly-coupled component hell.

export default function SettingsCommon({ sharedProps }) {
  const { card } = sharedProps;

  return (
    <>
      {card === "Pic" && <Pic sharedProps={sharedProps} />}
      {card === "Email" && <Email sharedProps={sharedProps} />}
      {card === "Password" && <Password sharedProps={sharedProps} />}
      {card === "Plan" && <Plan sharedProps={sharedProps} />}
    </>
  );
}
