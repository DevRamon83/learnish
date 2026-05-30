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
  const { currentPoints, points } = states;
  const { setStart } = setters;
  return (
    <div className={classes.menu}>
      <FlashcardHelpBtn
        classes={classes}
        setters={setters}
        cards={cards}
        states={states}
      />
      <ScoreAndPoints
        strings={strings}
        stringKey="score"
        state={points}
        scoreClass={classes.score}
      />
      <div className={classes.finish} onClick={() => setStart(false)}>
        <img src="/finish.svg" />
      </div>
      <ScoreAndPoints
        strings={strings}
        stringKey="points"
        state={currentPoints}
        scoreClass={classes.points}
      />
      <FlashcardNextBtn setters={setters} states={states} classes={classes} />
    </div>
  );
}
