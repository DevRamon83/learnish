import learnish from "../../assets/learnish.svg";

export default function Logo() {
  return (
    <div className="navbar__logo">
      <img className="navbar__logo-img" src={learnish} />
    </div>
  );
}
