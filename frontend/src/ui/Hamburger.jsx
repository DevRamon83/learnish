export default function Hamburger({ toggleNavbar, isOpen, classes }) {
  const { hamburgerBar, hamburgerBarActive, hamburger } = classes;
  return (
    <button
      className={`${hamburger} ${isOpen ? hamburgerBarActive : ""}`}
      onClick={toggleNavbar}
    >
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
    </button>
  );
}
