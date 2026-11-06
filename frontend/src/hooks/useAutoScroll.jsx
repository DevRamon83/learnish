import { useEffect, useRef } from "react";

const useAutoScroll = (trigger, invert, straightDown) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: invert ? 0 : containerRef.current.scrollHeight,
        behavior: straightDown ? "auto" : "smooth",
      });
    }
  }, [trigger, invert, straightDown]);

  return containerRef;
};

export default useAutoScroll;
