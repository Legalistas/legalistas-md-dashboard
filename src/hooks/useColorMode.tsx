import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const className = "dark";
      const bodyClass = window.document.body.classList;

      colorMode === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }
  }, [colorMode, isClient]);

  return [colorMode, setColorMode];
};

export default useColorMode;