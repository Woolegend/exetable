import { RefObject, useCallback, useEffect, useState } from "react";

const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [flag, setFlag] = useState(false);

  const handler = useCallback(
    (event: MouseEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node)) {
        setFlag(true);
        return;
      }
      setFlag(false);
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [handler]);

  return { get: flag, set: setFlag };
};

export default useOutsideClick;
