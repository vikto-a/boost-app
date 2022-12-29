import { useState, useEffect } from "react";

interface Dimensions {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
