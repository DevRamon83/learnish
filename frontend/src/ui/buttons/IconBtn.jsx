export default function IconBtn({ iconClass, img, handler }) {
  return (
    <>
      <img className={iconClass} src={img} onClick={handler} />
    </>
  );
}
