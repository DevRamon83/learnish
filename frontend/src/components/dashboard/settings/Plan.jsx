import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { classes } from "../../../constants/components/dashboard";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import { validatePlan } from "./validators";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function Plan({ user, strings, setError }) {
  const [changePlan, setChangePlan] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!changePlan) setChangePlan(!changePlan);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    if (Object.keys(data).length === 0) return;

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
    <div className={classes.settings.oddContainer}>
      <SettingsDataContainer
        type={"text"}
        data={`${strings.activePlan} ${user.plan}`}
        containerClass={classes.settings.oddData}
      />

      <form
        className={changePlan ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changePlan && (
          <select name="plan" id="plan" defaultValue={user.plan}>
            <option value="free">{strings.freeCost}</option>
            <option value="basic">{strings.basicCost}</option>
            <option value="pro">{strings.proCost}</option>
          </select>
        )}
        <SettingsButtonContainer
          toggle={changePlan}
          setToggle={setChangePlan}
          classes={classes.settings}
          setError={setError}
        />
      </form>
    </div>
  );
}
