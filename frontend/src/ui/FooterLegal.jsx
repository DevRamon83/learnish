import { NavLink } from "react-router-dom";

export default function FooterLegal({ strings }) {
  return (
    <h5>
      <NavLink className="footer__tos" to="/tos">
        {strings.tos}
      </NavLink>
      <NavLink className="footer__privacy" to="/privacy">
        {strings.privacy}
      </NavLink>
    </h5>
  );
}
