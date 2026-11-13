import { useEffect, useState } from "react";
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
  const [senderData, setSenderData] = useState(null);
  const handler = () => {
    if (isOpen) toggleNavbar();
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  useEffect(() => {
    if (!user.unreadMessages) return;
    setSenderData({
      username: user?.unreadMessages[0],
      profilePic: getMessageSenderPic(user),
    });
  }, [user?.unreadMessages?.length]);

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
