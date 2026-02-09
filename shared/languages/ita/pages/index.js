import homepage from "./homepage.json" with { type: "json" };

const pages = {
  homepage: {
    welcome: homepage.welcome,
    intro: homepage.introduction,
  },
};

export default pages;
