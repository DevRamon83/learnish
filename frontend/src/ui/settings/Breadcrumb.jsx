export default function Breadcrumb({ props }) {
  const { userCards, strings, setCard, toggle, card, classes } = props;

  return (
    <div className={classes.settings.breadcrumbContainer}>
      {!toggle &&
        userCards.map((value) => (
          <div
            className={
              card === value
                ? classes.settings.breadcrumbActiveBtn
                : classes.settings.breadcrumbBtn
            }
            onClick={() => setCard(value)}
            key={`breadcrumb_${value}`}
          >
            <img src={`/${value.toLowerCase()}.svg`} />

            <div className={classes.settings.breadcrumbText}>
              {strings.settingsCard[value]}
            </div>
          </div>
        ))}
    </div>
  );
}
