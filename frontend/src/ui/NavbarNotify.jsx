export default function NavbarNotify({
  notifyFromWho,
  goToMessages,
  closeNotify,
  classes,
}) {
  return (
    <div className={classes.navbarNotify}>
      <button onClick={notifyFromWho}>
        <img className={classes.notificationIcon} src="/notification.svg" />
      </button>
      <button onClick={goToMessages}>
        <img className={classes.notifyAction} src="/messages.svg" />
      </button>
      <button onClick={closeNotify}>
        <img className={classes.notifyClose} src="/close.svg" />
      </button>
    </div>
  );
}
