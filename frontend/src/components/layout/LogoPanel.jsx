import { classes } from "../../constants/layout/logo";
import getMessageSenderPic from "../../helpers/getMessageSenderPic";
import getPicUrl from "../../helpers/getPicUrl";
import Logo from "../../ui/Logo";

export default function LogoPanel({
  logoState,
  isOpen,
  toggleNavbar,
  isNotificationOpen,
  setIsNotificationOpen,
  user,
  notifyClass,
}) {
  const handler = () => {
    if (isOpen) toggleNavbar();
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const senderData = {
    username: user?.unreadMessages[0],
    profilePic: getMessageSenderPic(user),
  };

  return (
    <>
      {isNotificationOpen ? (
        <div onClick={closeNotification} className={notifyClass + logoState}>
          <div className={classes.avatarContainer}>
            <img className={classes.avatar} src={getPicUrl(senderData)} />
          </div>
          {senderData.username}
        </div>
      ) : (
        <Logo handler={handler} classes={classes} logoState={logoState} />
      )}
    </>
  );
}
