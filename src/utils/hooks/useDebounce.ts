import React from "react";

/**
 * Hook to handle the click outside the referenced element
 * @param value - actul value that is returned back
 * @param delay - delay when value is returned in ms
 */
const useDebounce = (value: number | string, delay: number) => {
  // States for debounce
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
