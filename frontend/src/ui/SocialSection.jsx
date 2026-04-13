import SocialLink from "./SocialLink";

export default function SocialSection() {
  const socials = ["facebook", "x", "youtube", "instagram", "tiktok"];
  return (
    <div className="footer__social">
      {socials.map((social) => (
        <SocialLink key={social} social={social} />
      ))}
    </div>
  );
}
