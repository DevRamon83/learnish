import { NavLink } from "react-router-dom";

export default function FooterSystem() {
  return (
    <div className="footer__system">
      <NavLink className="footer__btn-system" to="/" end>
        home
      </NavLink>
      |
      <NavLink className="footer__btn-system" to="/login">
        accedi
      </NavLink>
      |
      <NavLink className="footer__btn-system" to="/signup">
        registrati
      </NavLink>
      |
      <NavLink className="footer__btn-system" to="/price">
        prezzi
      </NavLink>
    </div>
  );
}
