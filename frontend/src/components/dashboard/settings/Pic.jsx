import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import fetchPic from "../../../api/handlers/fetchPic";
import { validatePic } from "./validators";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function Pic({ props }) {
  const { strings, classes, user, toggle, setToggle, userPic, setUserPic } =
    props;

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("profilePic");

    const isValid = validatePic(file);

    if (isValid.error) {
      setToggle(!toggle);
      return;
    }

    const update = await fetchPic(formData, "profilePic");
    if (update.error) {
      return;
    }

    setToggle(!toggle);
    const newUser = { ...user };
    newUser.pic = update.pic;
    dispatch(setUser(newUser));
  };

  const changeUrl = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValid = validatePic(file);
    if (isValid.error) {
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setUserPic({ url: localUrl });
  };

  const { container, form } = classes.settings;

  return (
    <>
      <h3 className="settings__title">Immagine profilo</h3>
      <div className={`${container}`}>
        <div className="settings__imgContainer">
          <img src={userPic.url} />
        </div>
        {toggle && (
          <>
            <form onSubmit={submitHandler} className={toggle ? form : ""}>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/png, image/jpeg"
                onChange={changeUrl}
              />
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
    </>
  );
}
