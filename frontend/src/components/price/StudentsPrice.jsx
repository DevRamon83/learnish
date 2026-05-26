import PriceRow from "./PriceRow";

export default function StudentsPrice({ strings, classes }) {
  const config = { classes, strings };
  return (
    <>
      <div className={classes.studentsContainer}>
        <PriceRow data={strings.plans} config={config} stringKey="plans" />
        <PriceRow data={strings.ads} config={config} stringKey="ads" />
        <PriceRow data={strings.modules} config={config} stringKey="modules" />
        <PriceRow
          data={strings.tutoring}
          config={config}
          stringKey="tutoring"
        />
        <PriceRow data={strings.summary} config={config} stringKey="summary" />
        <PriceRow data={strings.stats} config={config} stringKey="stats" />
        <PriceRow
          data={strings.phonetic}
          config={config}
          stringKey="phonetic"
        />
        <PriceRow data={strings.level} config={config} stringKey="level" />
        <PriceRow data={strings.price} config={config} stringKey="price" />
      </div>
      <p className={classes.note}>{strings.note.ads}</p>
      <p className={classes.note}>{strings.note.tutoring}</p>
    </>
  );
}
