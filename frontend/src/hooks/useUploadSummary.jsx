import { useState } from "react";
import { useEffect } from "react";
import fetchNewSummary from "../api/handlers/fetchNewSummary";
import fetchCorrection from "../api/handlers/fetchCorrection";
import fetchStats from "../api/handlers/fetchStats";
import {
  newSummaryInitialStatus,
  newSummaryInitialStep,
} from "../constants/components/dashboard";

const errorHandler = (errorMsg, setUploadStatus, caller) => {
  let value = "failed";
  if (errorMsg === "unavailable") {
    value = "unavailable";
  }

  setUploadStatus((prev) => ({ ...prev, [caller]: value }));
};

const respHandler = (resp, setters, caller) => {
  const { setUploadStep, setUploadStatus } = setters;
  if (resp.error) {
    errorHandler(resp.errorMessage, setUploadStatus, caller);
  } else {
    setUploadStep((prev) => ({ ...prev, [caller]: true }));
    setUploadStatus((prev) => ({ ...prev, [caller]: "success" }));
  }
};

const runStats = async (controller, setters, summaryID) => {
  const data = { id: summaryID };
  const stats = await fetchStats(data, controller.signal);
  respHandler(stats, setters, "stats");
};

const fetchAiCorrection = async (controller, setters, lang, summaryID) => {
  const summary = { id: summaryID, lang };
  const ai = await fetchCorrection(summary, controller.signal);
  respHandler(ai, setters, "correction");
};

const fetchDraft = async (controller, setters, dataObj) => {
  const draft = await fetchNewSummary(dataObj, controller.signal);
  const { setSummaryID } = setters;
  setSummaryID(draft.id);
  respHandler(draft, setters, "draft");
};

const useUploadSummary = (dataObj, lang, setIsUiBlocked) => {
  const [retry, setRetry] = useState(0);
  const [uploadStep, setUploadStep] = useState(newSummaryInitialStep);
  const [uploadStatus, setUploadStatus] = useState(newSummaryInitialStatus);
  const [summaryID, setSummaryID] = useState(null);
  const setters = { setUploadStep, setUploadStatus, setRetry, setSummaryID };
  const states = {
    step: uploadStep,
    status: uploadStatus,
    summaryID,
  };

  // Once each call completes, respHandler updates uploadStep and re-triggers
  // the effect. The if blocks ensure that calls are executed one at a time
  // in the intended order, preventing duplicate calls and ensuring the code
  // doesn't trigger an infinite loop."

  useEffect(() => {
    const controller = new AbortController();

    const processSummary = async () => {
      if (!dataObj) return;
      setIsUiBlocked(true);

      if (uploadStep.draft && !uploadStatus.draft) {
        await fetchDraft(controller, setters, dataObj);
      }

      if (!uploadStep.correction && uploadStatus.draft === "success") {
        await fetchAiCorrection(controller, setters, lang, summaryID);
      }

      if (!uploadStep.stats && uploadStatus.correction === "success") {
        await runStats(controller, setters, summaryID);
      }
    };

    processSummary();

    return () => controller.abort();
  }, [uploadStep, retry]);

  const errorValues = ["failed", "unavailable"];

  // Handles unlocking the UI upon operation completion (both on success and failure),
  // allowing the user to resume the cycle only from the interruption point in case of
  // failure. Note: Do not attempt to merge both effects into one,
  // otherwise you will trigger an infinite loop.

  useEffect(() => {
    if (
      errorValues.includes(uploadStatus.draft) ||
      errorValues.includes(uploadStatus.correction) ||
      errorValues.includes(uploadStatus.stats) ||
      uploadStatus.stats === "success"
    )
      setIsUiBlocked(false);
  }, [uploadStatus]);

  return { states, setters };
};

export default useUploadSummary;
