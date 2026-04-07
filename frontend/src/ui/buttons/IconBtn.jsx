import { classes } from "../../constants/layout/buttons";

export default function IconBtn({ iconSrc, text, classStyle }) {
  return (
    <div className={classes.iconBtn.container}>
      <div className={classStyle}>
        <img className={classes.iconBtn.img} src={iconSrc} />
      </div>
      <div className={classes.iconBtn.text}> {text}</div>
    </div>
  );
}
