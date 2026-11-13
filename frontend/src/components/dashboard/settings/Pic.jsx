import fetchPic from "../../../api/handlers/fetchPic";
import { validatePic } from "./validators";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
import { useEffect, useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import Spinner from "../../../ui/Spinner";

export default function Pic({ sharedProps }) {
  const { strings, classes, toggle, setToggle, card, setError } = sharedProps;

  const user = useSelector((state) => state.auth.user);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [userPic, setUserPic] = useState({
    url: getPicUrl(user, true),
  });

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (fetchStatus) return;
    setFetchStatus("pending");

    const formData = new FormData(e.currentTarget);

    const file = formData.get("profilePic");

    const isValid = validatePic(file);

    if (isValid.error) {
      setToggle(!toggle);
      setError(isValid.errorMsg);
      setFetchStatus(null);
      return;
    }

    const update = await fetchPic(formData, "profilePic");
    if (update.error) {
      setFetchStatus(null);
      setError(update.errorMessage);
      return;
    }

    if (userPic.url?.startsWith("blob:")) {
      URL.revokeObjectURL(userPic.url);
    }

    const newUser = { ...user };
    newUser.pic = update.pic;
    dispatch(setUser(newUser));
    setFetchStatus(null);
    setToggle(!toggle);
  };

  const changeUrl = (e) => {
    const file = e.target.files[0];
    if (!file) return setError("choseAPic");

    if (userPic.url && userPic.url.startsWith("blob:")) {
      URL.revokeObjectURL(userPic.url);
    }

    const localUrl = URL.createObjectURL(file);
    setUserPic({ url: localUrl });
  };

  useEffect(() => {
    if (!toggle && userPic.url?.startsWith("blob:")) {
      URL.revokeObjectURL(userPic.url);
      setUserPic({ url: getPicUrl(user, true) });
    }
  }, [toggle]);

  const { form } = classes.settings;

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
          {fetchStatus === "pending" && <Spinner />}
        </form>
      )}
    </>
  );
}
