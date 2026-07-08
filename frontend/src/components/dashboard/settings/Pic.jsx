import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import fetchPic from "../../../api/handlers/fetchPic";
import { validatePic } from "./validators";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function Pic({ props, picProps }) {
  const { strings, classes, toggle, setToggle, card } = props;

  const { user, userPic, setUserPic } = picProps;

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
      <SettingsCommonTitle
        classes={classes}
        string={strings.profilePic}
        src={userPic.url}
      />
      {toggle && (
        <form
          id={`settings__${card}`}
          onSubmit={submitHandler}
          className={toggle ? form : ""}
        >
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/png, image/jpeg"
            onChange={changeUrl}
          />
        </form>
      )}
    </>
  );
}
