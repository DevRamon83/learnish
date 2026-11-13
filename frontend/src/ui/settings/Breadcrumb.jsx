export default function Breadcrumb({ sharedProps }) {
  const { userCards, setCard, toggle, card, strings, classes } = sharedProps;

  return (
    <div className={classes.settings.breadcrumbContainer}>
      {!toggle &&
        userCards.map((value) => (
          <button
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
          </button>
        ))}
    </div>
  );
}
