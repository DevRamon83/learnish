import { useEffect } from "react";

export const useHideOverflow = (hide) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (hide) {
      body.classList.add("hide__overflow");
    } else {
      body.classList.remove("hide__overflow");
    }
  }, [hide]);
};
