import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { validatePlan } from "./validators";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function Plan({ planProps, props }) {
  const { user } = planProps;
  const { strings, classes, card, toggle, setToggle } = props;

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0) return;

    const isValid = validatePlan(data, user);
    if (isValid.error) {
      setToggle(!toggle);
      return;
    }

    const update = await fetchUpdateSettings(data);
    if (update.error) {
      return;
    }

    setToggle(!toggle);
    const newUser = { ...user };
    newUser.plan = data.plan;
    dispatch(setUser(newUser));
  };

  const { form } = classes.settings;

  return (
    <>
      <SettingsCommonTitle
        classes={classes}
        string={`${strings.activePlan} ${user.plan}`}
        src="/plan.jpeg"
      />

      {toggle && (
        <>
          <form
            id={`settings__${card}`}
            onSubmit={submitHandler}
            className={toggle ? form : ""}
          >
            <select
              className={classes.settings.planInput}
              name="plan"
              id="plan"
              defaultValue={user.plan}
            >
              <option value="free">{strings.freeCost}</option>
              <option value="basic">{strings.basicCost}</option>
              <option value="pro">{strings.proCost}</option>
            </select>
          </form>
        </>
      )}
    </>
  );
}
