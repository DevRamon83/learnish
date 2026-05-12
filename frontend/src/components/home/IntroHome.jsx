import { useState } from "react";
import ScrollReveal from "../ScrollReveal";
import HomeCard from "../../ui/HomeCard";
import { classes } from "../../constants/pages/home";

export default function IntroHome({ strings }) {
  const images = [
    "charts",
    "exercises",
    "teacher",
    "vocabulary",
    "phonetic",
    "grammar",
  ];

  const [card, setCard] = useState(null);
  const [cardText, setCardText] = useState(null);

  const cardHandler = (activeCard) => {
    if (card === activeCard) {
      setCard(null);
      setCardText(null);
    } else {
      setCard(activeCard);
      setCardText(strings[activeCard]);
    }
  };

  return (
    <>
      <h2 className={classes.cardTitle}>{strings.intro}</h2>
      <div className={classes.cardContainer}>
        {images.map((img) => (
          <HomeCard
            key={`img${img}`}
            card={card}
            img={img}
            cardHandler={cardHandler}
            strings={strings}
          />
        ))}
      </div>
    </>
  );
}

//
