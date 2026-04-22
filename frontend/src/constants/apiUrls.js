export const API_URLS = {
  base: "http://localhost:4000/api",
  auth: {
    base: "/auth",
    login: "/login",
    logout: "/logout",
    signup: "/signup",
    check: "/check",
    isUnique: "/unique",
    verify: "/verify/",
  },
  dashboard: {
    base: "/dashboard",
    summaries: "/summariesList",
    summary: "/newSummary",
    correction: "/aiCorrection",
    stats: "/newStat",
    allStats: "/getStats",
  },
  messages: {
    base: "/messages",
    new: "/new",
  },
};
