import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children, handler, action }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            handler && handler(action);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
