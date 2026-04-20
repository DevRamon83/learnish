import { useState } from "react";
import { useEffect } from "react";
import fetchNewSummary from "../api/handlers/fetchNewSummary";
import fetchCorrection from "../api/handlers/fetchCorrection";
import fetchStats from "../api/handlers/fetchStats";
import { newSummaryInitialState } from "../constants/layout/dashboard";

const respHandler = (resp, setters, caller) => {
  const { setUploadStep, setUploadStatus } = setters;
  if (resp.error) {
    setUploadStep((prev) => ({ ...prev, [caller]: null }));
    setUploadStatus((prev) => ({ ...prev, [caller]: "failed" }));
  } else {
    setUploadStep((prev) => ({ ...prev, [caller]: true }));
    setUploadStatus((prev) => ({ ...prev, [caller]: "success" }));
    caller !== "stats" && setSummaryData(resp);
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
  const [uploadStep, setUploadStep] = useState(newSummaryInitialState);
  const [uploadStatus, setUploadStatus] = useState(newSummaryInitialState);
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
        setUploadStatus((prev) => ({ ...prev, draft: "pending" }));
        await fetchDraft(controller, setters, dataObj);
      }

      if (!uploadStep.correction && uploadStatus.draft === "success") {
        setUploadStatus((prev) => ({ ...prev, correction: "pending" }));
        await fetchAiCorrection(controller, setters, lang, summaryData);
      }

      if (!uploadStep.stats && uploadStatus.correction === "success") {
        setUploadStatus((prev) => ({ ...prev, stats: "pending" }));
        await runStats(controller, setters, summaryData);
      }
    };

    processSummary();

    return () => controller.abort();
  }, [uploadStep, retry]);

  return { states, setters };
};

export default useUploadSummary;
