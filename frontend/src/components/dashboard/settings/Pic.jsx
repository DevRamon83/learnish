import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import fetchPic from "../../../api/handlers/fetchPic";
import { classes } from "../../../constants/components/dashboard";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import { validatePic } from "./validators";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";

export default function Pic({ user, strings, setError }) {
  const [changePic, setChangePic] = useState(false);
  const [pic, setPic] = useState({
    url: getPicUrl(user),
  });
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!changePic) setChangePic(!changePic);

    const formData = new FormData(e.currentTarget);

    const file = formData.get("profilePic");

    const isValid = validatePic(file);

    if (isValid.error) {
      setChangePic(!changePic);
      return;
    }

    const update = await fetchPic(formData, "profilePic");
    if (update.error) {
      return;
    }

    setChangePic(!changePic);
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
    setPic({ url: localUrl });
  };
  return (
    <div className={classes.settings.evenContainer}>
      <SettingsDataContainer
        type={"img"}
        data={pic.url}
        containerClass={classes.settings.picClass}
      />
      <form
        className={changePic ? classes.settings.form : ""}
        onSubmit={submitHandler}
      >
        {changePic && (
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/png, image/jpeg"
            onChange={changeUrl}
          />
        )}
        <SettingsButtonContainer
          toggle={changePic}
          setToggle={setChangePic}
          classes={classes.settings}
          setError={setError}
        />
      </form>
    </div>
  );
}
