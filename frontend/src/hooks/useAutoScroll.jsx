import { useEffect, useRef } from "react";

const useAutoScroll = (trigger) => {
  const firstRender = useRef(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: firstRender.current ? "auto" : "smooth",
      });
    }

    firstRender.current = false;
  }, [trigger]);

  return containerRef;
};

export default useAutoScroll;
