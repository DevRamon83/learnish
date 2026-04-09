import { NavLink } from "react-router-dom";

export default function NavbarBtn({ link, img, text, toggleNavbar }) {
  return (
    <>
      <NavLink onClick={toggleNavbar} to={link} className="navbar__tab">
        <div className="navbar__tab-img">
          <img src={img} />
        </div>
        {text}
      </NavLink>
    </>
  );
}
