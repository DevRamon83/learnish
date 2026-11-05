import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ChatList from "../../../ui/ChatList";
import ChatPanel from "./ChatPanel";
import { useChatInitialization } from "../../../hooks/useChatInitialization";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";

/**
 * ARCHITECTURAL NOTE: Real-Time Chat & State Synchronization Strategy
 *
 * DESIGN GOAL: Maximize UI fluidness and eliminate redundant DB fetches during
 * dashboard navigation, while ensuring real-time notification routing across
 * the entire application.
 *
 * APPROACH:
 * 1) Mutable Cache (Ref Map): Stored at dashboard level. Uses receiver IDs as keys
 *    mapping to nested maps tracking message arrays and sequential slice bounds
 *    ([start, end] indexes). This acts as the source of truth and handles
 *    pagination parameters for retro-fetching.
 *
 * 2) Reactive Local State: Mounted chat components synchronize with the mutable
 *    cache ref, triggering localized, isolated re-renders without impacting
 *    the parent tree.
 *
 * 3) On-Demand DB Fetching: Limited to two scenarios:
 *    a) Initial chat load (fetches the latest 10-message chunk if the cache is pristine).
 *    b) User-triggered pagination (infinite scroll for older messages using cache index ranges).
 *
 * 4) Event-Driven Notification Routing:
 *    - IF CHATTING: Local socket listeners intercept incoming traffic, mutating the cache
 *      directly and triggering local notifications (bypassing Redux).
 *    - IF NOT CHATTING: A global socket listener dispatches to Redux. The global Navbar
 *      intercepts the slice update, animates the UI, and deposits the payload
 *      back into the cache upon dashboard re-entry, subsequently wiping the global store
 *      to prevent memory leaks.
 */

export default function Messages({ cache }) {
  const user = useSelector((state) => state.auth.user);

  // Tracks background messages received from other users while the current chat is open.
  // Used to display real-time visual alerts/badges inside the messages UI.
  const [notification, setNotification] = useState(null);
  const { strings } = useLang(i18nAddresses.dashboard);

  const currentChatHandler = (student) => {
    setReceiverID(student._id);
    setReceiverUsername(student.username);
  };

  const {
    chatList, // List of accounts the current user can chat with.
    receiverID, // ID of the currently selected account.
    setReceiverID,
    receiverUsername,
    setReceiverUsername,
  } = useChatInitialization(user);

  useEffect(() => {
    setNotification(null);
  }, [receiverID]);

  return (
    <>
      {notification && (
        <div>
          {strings.messages.notification} {notification}
        </div>
      )}
      {user && (
        <>
          {chatList.length > 0 && (
            <ChatList
              chatList={chatList}
              receiverID={receiverID}
              currentChatHandler={currentChatHandler}
            />
          )}
          <ChatPanel
            receiverID={receiverID}
            messagesCachet={cache}
            receiverName={receiverUsername}
            user={user}
            setNotification={setNotification}
            strings={strings.messages}
          />
        </>
      )}
    </>
  );
}
