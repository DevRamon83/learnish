import { classes } from "../../constants/components/dashboard";

export default function SummaryYoutubeBtn({ url }) {
  return (
    <a
      className={classes.summary.youtube}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={classes.summary.iconVideo}>
        <img src="/video.svg" />
      </div>
    </a>
  );
}
