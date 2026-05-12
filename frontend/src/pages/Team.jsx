import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import { classes } from "../constants/pages/team";

export default function Team() {
  const { strings, lang } = useLang(i18nAddresses.team);
  const { people } = strings;

  const [current, setCurrent] = useState(0);
  const handler = (next) => {
    let index = current + next;
    if (index > people.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = people.length - 1;
    }

    setCurrent(index);
  };

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h4 className={classes.nameMobile}>{people[current].name}</h4>
        <div className={classes.carousel}>
          <img className={classes.img} src={people[current].img} />

          <div onClick={() => handler(-1)} className={classes.back}>
            {strings.back}
          </div>
          <div onClick={() => handler(+1)} className={classes.forward}>
            {strings.forward}
          </div>
        </div>
        <div className={classes.info}>
          <h4 className={classes.nameDesk}>{people[current].name}</h4>
          <div className={classes.description}>
            {people[current].description}
          </div>
        </div>
      </div>
    </main>
  );
}
