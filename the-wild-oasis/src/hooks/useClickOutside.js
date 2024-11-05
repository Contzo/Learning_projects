import { useEffect, useRef } from "react";

function useClickOutside(callback, listenCapture = true) {
  const ref = useRef(null); // ref used to select the styled Modal

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      }
      document.addEventListener("click", handleClick, {
        capture: listenCapture,
      });

      return () =>
        document.removeEventListener("click", handleClick, {
          capture: listenCapture,
        });
    },
    [callback, listenCapture]
  );
  return ref;
}

export default useClickOutside;
