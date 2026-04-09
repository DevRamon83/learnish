export default function IconBtn({ iconClass, img, handler, value }) {
  return (
    <div onClick={() => handler(value)} className={iconClass}>
      <img src={img} />
    </div>
  );
}
