export default function PriceRow({ data, config, stringKey }) {
  const keyName = data[0];
  const { classes, strings } = config;
  const valueHandler = (value) => {
    if (value === "false") {
      return <img src="/invalid.svg" />;
    } else if (value === "true") {
      return <img src="/valid.svg" />;
    } else {
      return value;
    }
  };
  return (
    <div className={classes.rowContainer}>
      {data.map((value, index) => (
        <div
          className={`${classes.rowCell}${index}`}
          key={`${keyName}${index}`}
        >
          {index === 0 ? strings.explain[stringKey] : valueHandler(value)}
        </div>
      ))}
    </div>
  );
}
