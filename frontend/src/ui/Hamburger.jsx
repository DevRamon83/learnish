export default function Hamburger({ toggleNavbar, isOpen, classes }) {
  const { hamburgerBar, hamburgerBarActive, hamburger } = classes;
  return (
    <div
      className={`${hamburger} ${isOpen ? hamburgerBarActive : ""}`}
      onClick={toggleNavbar}
    >
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
    </div>
  );
}
