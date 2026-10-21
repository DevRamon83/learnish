import { useState } from "react";
import SummaryAction from "../../../ui/summary/SummaryAction";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import fetchCorrection from "../../../api/handlers/fetchCorrection";
import SummaryYoutubeBtn from "../../../ui/summary/SummaryYoutubeBtn";
import SummaryOpenBtn from "../../../ui/summary/SummaryOpenBtn";
import fetchStats from "../../../api/handlers/fetchStats";

export default function ReadSummary({
  setter,
  summary,
  setMySummary,
  setCurrentError,
  classes,
}) {
  const [status, setStatus] = useState(null);
  const { lang, strings } = useLang(i18nAddresses.summary);
  const { score } = classes.summary;
  const draft = summary.isDraft;
  const misalignment = summary.misalignment;
  const alert = draft || misalignment;

  const openAlert = () => {
    if (draft) setStatus("draft");
    if (misalignment) setStatus("misalignment");
  };

  const actionHandler = async (action) => {
    let response = null;
    const data = { id: summary._id, lang };
    if (action === "correction") {
      response = await fetchCorrection(data);
    } else if (action === "stats") {
      response = await fetchStats(data);
    }

    if (response.error) {
      // handle error
    } else {
      setMySummary(response.summary);
      setCurrentError(response.summary.errorCodes[0]);
      setStatus(null);
    }
  };

  let scoreClass = null;
  if (summary.score) {
    if (summary.score.overall <= 3) {
      scoreClass = score.bad;
    } else if (summary.score.overall <= 6) {
      scoreClass = score.medium;
    } else {
      scoreClass = score.good;
    }
  }

  const url = `https://youtu.be/${summary.videoID}`;

  return (
    <div className={classes.summary.iconContainer}>
      {alert && (
        <div onClick={openAlert} className={classes.summary.iconAlert}>
          <img className={classes.summary.alertImg} src="/alert.svg" />
        </div>
      )}
      <SummaryAction
        actionHandler={actionHandler}
        closeAlert={setStatus}
        status={status}
        classes={classes}
        strings={strings}
      />
      {!alert && (
        <>
          <SummaryOpenBtn id={summary._id} setter={setter} />
          <SummaryYoutubeBtn url={url} />
          <div className={scoreClass}>{summary.score?.overall}</div>
        </>
      )}
    </div>
  );
}
