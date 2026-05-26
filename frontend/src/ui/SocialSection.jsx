import { socials, classes } from "../constants/layout/footer";
import SocialLink from "./SocialLink";

export default function SocialSection() {
  return (
    <div className={classes.social}>
      {socials.map((social) => (
        <SocialLink key={social} social={social} />
      ))}
    </div>
  );
}
