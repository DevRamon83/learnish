import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import fetchPic from "../../../api/handlers/fetchPic";
import SettingsBtn from "../../../ui/buttons/SettingsBtn";
import { classes } from "../../../constants/components/dashboard";
import CloseSettingsBtn from "../../../ui/buttons/CloseSettingsBtn";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import { validatePic } from "./validators";

export default function Pic({ user, strings }) {
  const [changePic, setChangePic] = useState(false);
  const [pic, setPic] = useState({
    url: getPicUrl(user),
  });

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
    setPic({ url: getPicUrl(user) });
  };

  return (
    <div className={classes.settings.container}>
      <SettingsDataContainer
        type={"img"}
        data={pic.url}
        classes={classes.settings}
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
          />
        )}
        <CloseSettingsBtn
          classes={classes.settings}
          state={changePic}
          setter={setChangePic}
        />
        <SettingsBtn classes={classes.settings} state={changePic} />
      </form>
    </div>
  );
}
