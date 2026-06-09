import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import Pic from "./settings/Pic";
import Plan from "./settings/Plan";

export default function Settings() {
  const user = useSelector((state) => state.auth.user);
  const planConfig = { type: "text", id: "plan" };

  return (
    <div className="settings__main">
      <Pic user={user} />
      <Plan user={user} config={planConfig} />
    </div>
  );
}
