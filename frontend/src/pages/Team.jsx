import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";

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
    <main className="team__main">
      <div className="team__carousell-container">
        <h4 className="team__name-mobile">{people[current].name}</h4>
        <div className="team__carousell">
          <img className="team__img" src={people[current].img} />

          <div onClick={() => handler(-1)} className="team__carousell-back">
            {strings.back}
          </div>
          <div onClick={() => handler(+1)} className="team__carousell-forward">
            {strings.forward}
          </div>
        </div>
        <div className="team__info">
          <h4 className="team__name-desktop">{people[current].name}</h4>
          <div className="team__description">{people[current].description}</div>
        </div>
      </div>
    </main>
  );
}
