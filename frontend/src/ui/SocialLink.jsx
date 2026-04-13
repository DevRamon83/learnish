export default function SocialLink({ social }) {
  const link = "https://" + social + ".com";
  const src = social + ".svg";
  return (
    <a
      className="footer__btn-social"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={src} />
    </a>
  );
}
