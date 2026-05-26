import ContactForm from "../components/forms/ContactForm";
import { classes } from "../constants/components/forms";

export default function Contact() {
  return (
    <div className={classes.contact.main}>
      <ContactForm />
    </div>
  );
}
