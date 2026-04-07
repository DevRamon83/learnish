import { NavLink } from "react-router-dom";
import IconBtn from "./buttons/IconBtn";
import { classes } from "../constants/layout/navbar";

export default function About({ strings }) {
  return (
    <>
      <NavLink to="/team" className={classes.aboutLinks}>
        <IconBtn
          classStyle={classes.iconTeam}
          iconSrc="/team.svg"
          text={strings.team}
        />
      </NavLink>

      <NavLink to="/about" className={classes.aboutLinks}>
        <IconBtn
          classStyle={classes.iconAbout}
          iconSrc="/about.svg"
          text={strings.about}
        />
      </NavLink>

      <NavLink to="/mission" className={classes.aboutLinks}>
        <IconBtn
          classStyle={classes.iconMission}
          iconSrc="/mission.svg"
          text={strings.mission}
        />
      </NavLink>
    </>
  );
}
