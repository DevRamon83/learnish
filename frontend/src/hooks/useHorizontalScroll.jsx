const useHorizontalScroll = (ref, direction) => {
  const space = direction === "left" ? 300 : -300;
  const scroller = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: space,
        behavior: "smooth",
      });
    }
  };

  return scroller;
};

export default useHorizontalScroll;
