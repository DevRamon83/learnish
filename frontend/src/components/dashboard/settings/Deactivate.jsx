import { useState } from "react";
import fetchDeactivateContract from "../../../api/handlers/fetchDeactivateContract";

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
    <div className={classes.deactivate}>
      {deactivate && (
        <div className={classes.confirmTxt}>{strings.confirmDeactivate}</div>
      )}
      {!deactivate ? (
        <div onClick={deactivateHandler}>{strings.deactivateBtn}</div>
      ) : (
        <div className={classes.confirmBtn} onClick={confirmHandler}>
          {strings.deactivateOk}
        </div>
      )}

      {deactivate && (
        <div
          className={classes.closeDeactivation}
          onClick={() => setDeactivate(false)}
        >
          {strings.close}
        </div>
      )}
    </div>
  );
}
