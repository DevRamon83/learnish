import { classes } from "../constants/layout/footer";

export default function SocialLink({ social }) {
  const link = "https://" + social + ".com";
  const src = "/" + social + ".svg";
  return (
    <a
      className={`${classes.btnBase}-social`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={src} />
    </a>
  );
}
