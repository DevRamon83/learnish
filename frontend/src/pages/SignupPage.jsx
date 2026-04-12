import SignupForm from "../components/forms/SignupForm";
import { classes } from "../constants/pages";

export default function SignupPage() {
  return (
    <main className={classes.mainSignup}>
      <SignupForm />
    </main>
  );
}
