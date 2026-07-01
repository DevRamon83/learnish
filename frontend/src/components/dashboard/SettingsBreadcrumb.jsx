export default function SettingsBreadcrumb({ props }) {
  const { userCards, strings, setCard, toggle, card } = props;

  return (
    <>
      <div className="settings__breadcrumbContainer-desk">
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
              {strings.settingsCard[value]}
            </div>
          ))}
      </div>

      <div className="settings__breadcrumbContainer-mobile">
        {!toggle &&
          userCards.map((value) => (
            <div
              className={
                card === value
                  ? "settings__breadcrumb-activeBtnMobile"
                  : "settings__breadcrumb-btnMobile"
              }
              onClick={() => setCard(value)}
              key={`breadcrumb_${value}`}
            >
              <img src={`/${value.toLowerCase()}.svg`} />
            </div>
          ))}
      </div>
    </>
  );
}
