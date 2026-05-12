import SignupForm from "../components/forms/SignupForm";
import { classes } from "../constants/pages/auth";

export default function SignupPage() {
  return (
    <main className={classes.mainSignup}>
      <SignupForm />
    </main>
  );
}
