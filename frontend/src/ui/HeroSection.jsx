import { classes } from "../constants/home";

export default function HeroSection({ strings }) {
  return (
    <>
      <div className={classes.hero}>
        <img className={`${classes.hero}-img`} src="/hero.jpeg" />
        <div className={`${classes.hero}-text`}>{strings.hero}</div>
      </div>
      <div className={`${classes.hero}-mobile`}>
        <img className={`${classes.hero}-img`} src="/heroMobile.jpeg" />
        <div className={`${classes.hero}-text`}>{strings.hero}</div>
      </div>
    </>
  );
}
