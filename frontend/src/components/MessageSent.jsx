import { useNavigate } from "react-router-dom";

export default function MessageSent({ strings, classes }) {
  const navigate = useNavigate();

  const handler = () => {
    navigate("/");
  };

  return (
    <div className={classes.contact.success}>
      {strings.success}
      <button className={classes.btn.message} onClick={handler}>
        {strings.back}
      </button>
    </div>
  );
}
