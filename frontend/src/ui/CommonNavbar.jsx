import { classes } from "../constants/layout/navbar";
import About from "./About";
import Info from "./Info";
import Legal from "./Legal";

export default function CommonNavbar({ strings }) {
  return (
    <div className={classes.commonContainer}>
      <div className={classes.about}>
        <About strings={strings} />
      </div>

      <div className={classes.info}>
        <Info strings={strings} />
      </div>

      <div className={classes.legal}>
        <Legal strings={strings} />
      </div>
    </div>
  );
}
