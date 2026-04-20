export default function SummaryYoutubeBtn({ url }) {
  return (
    <a
      className="summary__youtube"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="summary__iconVideo">
        <img src="/video.svg" />
      </div>
    </a>
  );
}
