import ActivateService from "../../components/dashboard/settings/ActivateService";
import Deactivate from "../../components/dashboard/settings/Deactivate";

export default function SettingsContractTitle({
  strings,
  setExist,
  exist,
  setUserField,
  classes,
  contract,
  lang,
}) {
  return (
    <div className={classes.titleContainer}>
      <h3>{strings.contract[contract]}</h3>
      {contract !== "subscription" && exist && (
        <Deactivate
          strings={strings}
          setExist={setExist}
          setUserField={setUserField}
          contract={contract}
          classes={classes}
        />
      )}

      {contract !== "subscription" && !exist && (
        <ActivateService
          service={contract}
          strings={strings}
          lang={lang}
          setUserField={setUserField}
          setExist={setExist}
          classes={classes}
        />
      )}
    </div>
  );
}
