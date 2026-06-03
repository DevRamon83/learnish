import FlashcardHelpBtn from "./FlashcardHelpBtn";
import FlashcardNextBtn from "./FlashcardNextBtn";
import ScoreAndPoints from "./ScoreAndPoints";

export default function FlashcardMenu({
  setters,
  cards,
  states,
  strings,
  classes,
}) {
  const { points, score } = states;
  const { setStart } = setters;
  return (
    <div className={classes.menu}>
      <div className="flashcard__menu-topRow">
        <FlashcardHelpBtn
          classes={classes}
          setters={setters}
          cards={cards}
          states={states}
        />
        <ScoreAndPoints
          strings={strings}
          stringKey="score"
          state={score}
          scoreClass={classes.score}
        />
      </div>
      <div className={classes.finish} onClick={() => setStart(false)}>
        <img src="/finish.svg" />
      </div>
      <div className="flashcard__menu-bottomRow">
        <ScoreAndPoints
          strings={strings}
          stringKey="points"
          state={points}
          scoreClass={classes.points}
        />
        <FlashcardNextBtn setters={setters} states={states} classes={classes} />
      </div>
    </div>
  );
}
