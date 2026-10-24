import { useState } from "react";
import bundle from "shared";
import LarScript from "./LarScript";
import { classes } from "../../../constants/components/exercises";
import TitleAndCloseBtn from "../../../ui/exercises/TitleAndCloseBtn";
import Level from "../../../ui/exercises/Level";
const { dialogues } = bundle;

export default function ListenAndRepeat({ setPanel, strings }) {
  const dialogueKeys = Object.keys(dialogues);
  const [card, setCard] = useState({
    dialogue: null,
    level: null,
  });

  const handler = (dialogue, level) => {
    setCard({
      dialogue,
      level: level,
    });
  };

  const closeHandler = () => {
    setCard({
      dialogue: null,
      level: null,
    });
    setPanel("-close");
  };

  const levels = ["A", "B", "C"];
  return (
    <>
      {!card.dialogue && (
        <div className={classes.container}>
          <TitleAndCloseBtn
            classes={classes}
            closeHandler={closeHandler}
            text={strings.lar}
          />
          {dialogueKeys.map((key) => (
            <div className={classes.larCard} key={key}>
              <img src={`/lar/${key}.jpg`} alt={key} title={key} />
              <>
                {levels.map((level) => (
                  <Level
                    key={`level_${level}`}
                    value={key}
                    handler={handler}
                    level={level}
                    classes={classes}
                    strings={strings}
                  />
                ))}
              </>
            </div>
          ))}
        </div>
      )}
      {card.dialogue && (
        <LarScript
          setCard={setCard}
          card={card}
          dialogues={dialogues}
          strings={strings}
        />
      )}
    </>
  );
}
