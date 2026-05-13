import PriceRow from "./PriceRow";

export default function TeachersPrice({ strings, classes }) {
  const config = { classes, strings };

  return (
    <>
      <div className={classes.teachersContainer}>
        <PriceRow data={strings.plans} config={config} stringKey="plans" />
        <PriceRow data={strings.ads} config={config} stringKey="ads" />
        <PriceRow data={strings.follow} config={config} stringKey="follow" />
        <PriceRow
          data={strings.visibility}
          config={config}
          stringKey="visibility"
        />
        <PriceRow
          data={strings.sharedStats}
          config={config}
          stringKey="sharedStats"
        />
        <PriceRow
          data={strings.classroom}
          config={config}
          stringKey="classroom"
        />
        <PriceRow
          data={strings.costPerStudent}
          config={config}
          stringKey="costPerStudent"
        />
        <PriceRow
          data={strings.teachersPrice}
          config={config}
          stringKey="teachersPrice"
        />
      </div>
      <p className="price__note">{strings.note.ads}</p>
      <p className="price__note">{strings.note.costPerStudent}</p>
    </>
  );
}
