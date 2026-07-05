import { useState } from "react";
import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";
import DeactivatePanel from "../../../ui/settings/DeactivatePanel";

export default function Deactivate({
  setExist,
  setUserField,
  strings,
  contract,
  classes,
}) {
  const [deactivate, setDeactivate] = useState(false);
  const [deactivateAlert, setDeactivateAlert] = useState(false);

  const deactivateHandler = () => {
    setDeactivate(true);
  };

  const confirmHandler = async () => {
    const data = { contract };
    const updated = await fetchDeactivateContract(data);
    if (updated.error) {
      // error handler
    }

    setExist(false);
    setUserField("");
  };

  return (
    <div className={classes.settings.deactivate}>
      {!deactivate ? (
        <div onClick={deactivateHandler}>{strings.deactivateBtn}</div>
      ) : (
        <DeactivatePanel
          classes={classes.settings}
          strings={strings}
          setDeactivate={setDeactivate}
          confirmHandler={confirmHandler}
        />
      )}
    </div>
  );
}
