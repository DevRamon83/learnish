export default function Hamburger({ hamburgerHandler, isOpen, classes }) {
  const { hamburgerBar, hamburgerBarActive, hamburger } = classes;
  return (
    <div
      className={`${hamburger} ${isOpen ? hamburgerBarActive : ""}`}
      onClick={hamburgerHandler}
    >
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
      <div className={hamburgerBar}></div>
    </div>
  );
}
