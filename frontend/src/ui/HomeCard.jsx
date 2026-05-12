import { classes } from "../constants/pages/home";

export default function HomeCard({ card, img, cardHandler, strings }) {
  const { cardBlock, homeCard } = classes;
  return (
    <div className={card === img ? `${cardBlock}-open` : cardBlock}>
      <div
        onClick={() => cardHandler(img)}
        className={`${homeCard} ${card === img ? `${homeCard}-open` : `${homeCard}-close`}`}
      >
        <img className={`${homeCard}Img`} src={`/${img}.jpeg`} />
        {card !== img && <div className={`${homeCard}Tag`}>{img}</div>}
      </div>
      {card === img && <div className={`${homeCard}Text`}>{strings[img]}</div>}
    </div>
  );
}
