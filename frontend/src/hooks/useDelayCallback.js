import { useEffect } from "react";

function useDelayCallback({ callback, condition = true, duration = 300 }) {

  useEffect(() => {
    let timeout = null;
    if (condition) {
      timeout = setTimeout(callback, duration);
    }

    return () => clearTimeout(timeout);
  }, [condition]);

  return;
}

export default useDelayCallback;
