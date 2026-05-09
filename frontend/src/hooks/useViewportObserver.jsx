import { useEffect, useState } from "react";

export default function useViewportObserver() {
  const [chartWidth, setChartWidth] = useState(0);
  const [viewport, setViewport] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport(window.innerWidth);
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (viewport <= 600) {
      const percent = (viewport / 100) * 80;
      setChartWidth(percent);
      setIsMobile(true);
    } else {
      setChartWidth(600);
      setIsMobile(false);
    }
  }, [viewport]);

  return { chartWidth, isMobile };
}
