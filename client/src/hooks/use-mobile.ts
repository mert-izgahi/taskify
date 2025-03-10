import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {isMobile};
};
