export default function SettingsBreadcrumb({ props }) {
  const { userCards, strings, setCard, toggle, card } = props;

  return (
    <div className="settings__breadcrumbContainer">
      {!toggle &&
        userCards.map((value) => (
          <div
            className={
              card === value
                ? "settings__breadcrumb-activeBtn"
                : "settings__breadcrumb-btn"
            }
            onClick={() => setCard(value)}
            key={`breadcrumb_${value}`}
          >
            <img src={`/${value.toLowerCase()}.svg`} />

            <div className="settings__breadcrumb-text">
              {strings.settingsCard[value]}
            </div>
          </div>
        ))}
    </div>
  );
}
