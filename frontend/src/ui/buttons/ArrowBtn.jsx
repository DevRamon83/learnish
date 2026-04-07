import { classes } from "../../constants/layout/buttons";

export default function ArrowBtn({ iconSrc, text }) {
  return (
    <div className={classes.double.container}>
      <div className={classes.double.leftImgContainer}>
        <img className={classes.double.leftImg} src={iconSrc} />
      </div>
      <div className={classes.double.text}>{text}</div>
      <div className={classes.double.rightImgContainer}>
        <img className={classes.double.rightImg} src="/arrow.svg" />
      </div>
    </div>
  );
}
