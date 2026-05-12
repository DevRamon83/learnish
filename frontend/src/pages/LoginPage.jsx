import LoginForm from "../components/forms/LoginForm";
import { classes } from "../constants/pages/auth";

export default function Login() {
  return (
    <main className={classes.mainLogin}>
      <LoginForm />
    </main>
  );
}
