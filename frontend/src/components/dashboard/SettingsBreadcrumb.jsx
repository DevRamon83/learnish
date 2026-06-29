export default function SettingsBreadcrumb({ props }) {
  const { userCards, strings, setCard, toggle } = props;
  return (
    <div className="settings__breadcrumbContainer">
      {!toggle &&
        userCards.map((card) => (
          <div
            className="settings__breadcrumb-btn"
            onClick={() => setCard(card)}
            key={`breadcrumb_${card}`}
          >
            {strings.settingsCard[card]}
          </div>
        ))}
    </div>
  );
}
