import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { classes } from "../../../constants/components/dashboard";
import SettingsBtn from "../../../ui/buttons/SettingsBtn";
import CloseSettingsBtn from "../../../ui/buttons/CloseSettingsBtn";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import { validatePlan } from "./validators";

export default function Plan({ user, strings }) {
  const [changePlan, setChangePlan] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!changePlan) setChangePlan(!changePlan);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const isValid = validatePlan(data, user);
    if (isValid.error) {
      setChangePlan(!changePlan);
      return;
    }

    const update = await fetchUpdateSettings(data);
    if (update.error) {
      return;
    }

    setChangePlan(!changePlan);
    const newUser = { ...user };
    newUser.plan = data.plan;
    dispatch(setUser(newUser));
  };

  return (
    <div className={classes.settings.container}>
      <SettingsDataContainer
        type={"text"}
        data={user.plan}
        classes={classes.settings}
      />

      <form
        className={changePlan ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changePlan && (
          <select name="plan" id="plan" defaultValue={user.plan}>
            <option value="free">0€/mese</option>
            <option value="basic">1€/mese</option>
            <option value="pro">10€/mese</option>
          </select>
        )}
        <CloseSettingsBtn
          classes={classes.settings}
          state={changePlan}
          setter={setChangePlan}
        />
        <SettingsBtn classes={classes.settings} state={changePlan} />
      </form>
    </div>
  );
}
