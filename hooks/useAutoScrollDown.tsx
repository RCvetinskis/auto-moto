import { useEffect, RefObject } from "react";

const useAutoScrollDown = (targetRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const targetElement = targetRef.current;

    const handleScroll = () => {
      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (targetRect.top < windowHeight / 2) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetRef]);
};

export default useAutoScrollDown;
