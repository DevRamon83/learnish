import { NavLink } from "react-router-dom";

export default function InfoBtn({ element, text }) {
  const link = "/" + element;
  const src = link + ".svg";
  return (
    <NavLink className="footer__btn-info" to={link}>
      <div className="footer__btn-img">
        <img src={src} />
      </div>
      <div className="footer__info-text">{text}</div>
    </NavLink>
  );
}
