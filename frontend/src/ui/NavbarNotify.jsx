export default function NavbarNotify({
  notifyFromWho,
  goToMessages,
  closeNotify,
  classes,
}) {
  return (
    <div className={classes.navbarNotify}>
      <img
        className={classes.notificationIcon}
        src="/notification.svg"
        onClick={notifyFromWho}
      />
      <img
        className={classes.notifyAction}
        src="/messages.svg"
        onClick={goToMessages}
      />
      <img
        className={classes.notifyClose}
        src="/close.svg"
        onClick={closeNotify}
      />
    </div>
  );
}
