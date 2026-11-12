export default function IconBtn({ iconClass, img, handler, value }) {
  return (
    <button onClick={() => handler(value)} className={iconClass}>
      <img src={img} />
    </button>
  );
}
