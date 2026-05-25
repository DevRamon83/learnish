export const classes = {
  dashActiveBtn: "btn__dash-active",
  dashBtn: "btn__dash",
  dashPanel: "dashboard__panel",
  menu: "dashboard__menu",
  summary: {
    base: "summary__",
    correction: "summary__correction",
    correctionSpan: "summary__correction-span",
    error: "summary__error",
    errorSpan: "summary__error-span",
    card: "summary__card",
    title: "summary__title",
    channel: "summary__channel",
    container: "summary",
    read: "summary__read",
    status: "summary__status",
    arrow: "btn__arrow",
    info: "summary__card-info",
    form: "summary__form",
    btnSend: "summary__btnSend",
    processUpload: "summary__process-upload",
    score: "summary__details-score",
    closeBtn: "summary__closeBtn",
    formTitle: "summary__form-title",
    newPanel: "summary__new-panel",
    readPanel: "summary__read-panel",
    iconContainer: "summary__iconsContainer",
    iconAlert: "summary__iconAlert",
    alertImg: "summary__iconAlert-img",
    list: "dashboard__summaries",
    textContainer: "summary__text-container",
    action: "summary__action",
    actionIconContainer: "summary__action-iconsContainer",
    errorTab: "summary__error-tab",
    errorBase: "summary__error-",
    errorOpen: "summary__error-open",
    errorClose: "summary__error-close",
    scoreContainer: "summary__score-container",
    errorsContainer: "summary__errors-container",
    processSpace: "summary__process-space",
    processLabel: "summary__process-label",
    processUnavailable: "summary__process-unavailable",
    processContainer: "summary__process-container",
    feed: "summary__feedback",
    score: {
      bad: "summary__iconScore-bad",
      medium: "summary__iconScore-medium",
      good: "summary__iconScore-good",
    },
  },
  lessons: {
    container: "dashboard__lessonsContainer",
    row: "dashboard__lessonRow",
    level: "dashboard__lessonLevel",
    error: "dashboard__lessonError",
    errorMsg: "dashboard__lessonError-msg",
    errorClose: "dashboard__lessonError-close",
    read: "dashboard__readLesson",
    unlock: "dashboard__lessonUnlock",
    title: "dashboard__lessonTitle",
  },
  study: {
    menu: "dashboard__studyMenu",
    activeTab: "dashboard__studyMenu-tabActive",
    tab: "dashboard__studyMenu-tab",
  },
};

export const newSummaryInitialStep = {
  draft: null,
  correction: null,
  stats: null,
};

export const newSummaryInitialStatus = {
  draft: null,
  correction: null,
  stats: null,
};

export const statsSymbols = { up: "🢁", down: "🢃", equal: "≈" };

export const bars = ["draft", "correction", "stats"];
