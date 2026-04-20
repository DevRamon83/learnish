import { useEffect, useState } from "react";
import SummaryAction from "../../../ui/summary/SummaryAction";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import fetchCorrection from "../../../api/handlers/fetchCorrection";
import SummaryYoutubeBtn from "../../../ui/summary/SummaryYoutubeBtn";
import SummaryOpenBtn from "../../../ui/summary/SummaryOpenBtn";

export default function ReadSummary({
  setter,
  summary,
  setMySummary,
  setCurrentError,
  classes,
}) {
  const [status, setStatus] = useState(null);
  const [scoreClass, setScoreClass] = useState(null);
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
    if (action === "correction") {
      const data = { id: summary._id, lang };
      response = await fetchCorrection(data);
    } else if (action === "stats") {
      // api stat alignment
    }

    if (response.error) {
    } else {
      setMySummary(response.summary);
      setCurrentError(response.summary.errorCodes[0]);
      setStatus(null);
    }
  };

  useEffect(() => {
    if (!summary.score) return;
    if (summary.score.overall <= 3) {
      setScoreClass(score.bad);
    } else if (summary.score.overall <= 6) {
      setScoreClass(score.medium);
    } else {
      setScoreClass(score.good);
    }
  }, [summary]);

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
