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
  const { setUploadStep, setUploadStatus, setSummaryData } = setters;
  if (resp.error) {
    errorHandler(resp.errorMessage, setUploadStatus, caller);
  } else {
    setUploadStep((prev) => ({ ...prev, [caller]: true }));
    setUploadStatus((prev) => ({ ...prev, [caller]: "success" }));
    setSummaryData(resp);
  }
};

const runStats = async (controller, setters, data) => {
  const stats = await fetchStats(data, controller.signal);
  respHandler(stats, setters, "stats");
};

const fetchAiCorrection = async (controller, setters, lang, data) => {
  const summary = { id: data.summary._id, lang };
  const ai = await fetchCorrection(summary, controller.signal);
  respHandler(ai, setters, "correction");
};

const fetchDraft = async (controller, setters, dataObj) => {
  const draft = await fetchNewSummary(dataObj, controller.signal);
  respHandler(draft, setters, "draft");
};

const useUploadSummary = (dataObj, lang) => {
  const [retry, setRetry] = useState(0);
  const [uploadStep, setUploadStep] = useState(newSummaryInitialStep);
  const [uploadStatus, setUploadStatus] = useState(newSummaryInitialStatus);
  const [summaryData, setSummaryData] = useState(null);
  const setters = { setUploadStep, setUploadStatus, setRetry, setSummaryData };
  const states = {
    step: uploadStep,
    status: uploadStatus,
    summary: summaryData,
  };

  useEffect(() => {
    const controller = new AbortController();

    const processSummary = async () => {
      if (!dataObj) return;
      if (uploadStep.draft && !uploadStatus.draft) {
        await fetchDraft(controller, setters, dataObj);
      }

      if (uploadStatus.draft === "failed") return;

      if (!uploadStep.correction && uploadStatus.draft === "success") {
        await fetchAiCorrection(controller, setters, lang, summaryData);
      }

      if (uploadStatus.correction === "failed") return;

      if (!uploadStep.stats && uploadStatus.correction === "success") {
        await runStats(controller, setters, summaryData);
      }
    };

    processSummary();

    return () => controller.abort();
  }, [uploadStep, retry]);

  return { states, setters };
};

export default useUploadSummary;
