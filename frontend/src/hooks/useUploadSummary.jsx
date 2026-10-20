import { useState } from "react";
import { useEffect } from "react";
import fetchNewSummary from "../api/handlers/fetchNewSummary";
import fetchCorrection from "../api/handlers/fetchCorrection";
import fetchStats from "../api/handlers/fetchStats";
import {
  newSummaryInitialStatus,
  newSummaryInitialStep,
} from "../constants/components/dashboard";

/**
 * ARCHITECTURE NOTE: Asynchronous State Machine via Render Cascades
 *
 * This hook manages a multi-step asynchronous workflow distributed across
 * sequential renders.
 *
 * 1. Step Triggering: The main useEffect relies exclusively on `uploadStep`
 *    in its dependency array. Each successful step updates the state via `respHandler`,
 *    changing `uploadStep` and intentionally triggering a re-evaluation
 *    of the effect on the next render.
 *
 * 2. Guard Clauses: The linear `if` conditions do not execute synchronously in a
 *    single run. Instead, they act as guard clauses that evaluate the state snapshot
 *    captured at the beginning of the current render, ensuring steps execute
 *    in the correct order without overlapping.
 *
 * 3. Dependency Constraints: Do NOT add `uploadStatus` to the main useEffect dependencies.
 *    Doing so will introduce race conditions and redundant execution triggers,
 *    disrupting the cascade.
 *
 * 4. Error Isolation: Failures and edge cases (e.g., "failed", "unavailable")
 *    are decoupled and handled independently by the secondary useEffect watching
 *    `uploadStatus`.
 */

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

      if (uploadStatus.correction === "failed") return setIsUiBlocked(false);

      if (!uploadStep.stats && uploadStatus.correction === "success") {
        await runStats(controller, setters, summaryID);
      }
    };

    processSummary();

    return () => controller.abort();
  }, [uploadStep, retry]);

  const errorValues = ["failed", "unavailable"];
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
