import { useState } from "react";
import fetchUpdateSettings from "../../../api/handlers/fetchUpdateSettings";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { validatePlan } from "./validators";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function Plan({ userType, props }) {
  const { strings, classes, card, setCard, user, toggle, setToggle } = props;
  const nextCard = userType === "student" ? "MyTeacher" : "Currency";

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

  const { container, form } = classes.settings;

  return (
    <div className={container}>
      <h3 className="settings__title">{`${strings.activePlan} ${user.plan}`}</h3>

      <div className="settings__imgContainer">
        <img src={"/plan.jpeg"} />
      </div>

      {toggle && (
        <>
          <form onSubmit={submitHandler} className={toggle ? form : ""}>
            <select
              name="settings__plan"
              id="settings__plan"
              defaultValue={user.plan}
            >
              <option value="free">{strings.freeCost}</option>
              <option value="basic">{strings.basicCost}</option>
              <option value="pro">{strings.proCost}</option>
            </select>
            <button className="settings__button-fetch" type="submit" />
          </form>
        </>
      )}

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
        submitHandler={submitHandler}
      />
      <SettingsBreadcrumb props={props} />
    </div>
  );
}
