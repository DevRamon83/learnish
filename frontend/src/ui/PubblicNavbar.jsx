import { NavLink } from "react-router-dom";

export default function PubblicNavbar({ btn }) {
  return (
    <>
      <NavLink to="/login" className={btn}>
        login
      </NavLink>
      <NavLink to="/signup" className={btn}>
        signup
      </NavLink>
    </>
  );
}
