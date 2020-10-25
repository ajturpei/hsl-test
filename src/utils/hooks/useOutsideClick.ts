import { useEffect } from "react";

/**
 * Hook to handle the click outside the referenced element
 * @param ref - reference to the targeted element
 * @param callback - callback
 */

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: MouseEvent | KeyboardEvent) => {
    if (ref?.current && !ref?.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
