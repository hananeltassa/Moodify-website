import { useState, useEffect } from "react";

const useSplashScreen = (duration = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), duration);
    return () => clearTimeout(timer); 
  }, [duration]);

  return isLoading;
};

export default useSplashScreen;
