import { useEffect, useState } from 'react';

export const useDebounce = (trackingVariable, debounceTime) => {
  const [state, setState] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(trackingVariable);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [trackingVariable, debounceTime]);

  return state;
};
