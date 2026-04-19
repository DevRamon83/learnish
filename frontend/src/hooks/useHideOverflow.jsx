import { useEffect } from "react";

export const useHideOverflow = (hide) => {
  useEffect(() => {
    if (hide) {
      document.body.classList.add("hide__overflow");
    } else {
      document.body.classList.remove("hide__overflow");
    }

    return () => document.body.classList.remove("hide__overflow");
  }, [hide]);
};
