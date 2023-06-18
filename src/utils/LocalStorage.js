import { useRef, useEffect } from 'react';
import partial  from "lodash/partial";

const saveToLocalStorage = (storageItemName, state) => {
  try {
    localStorage.setItem(storageItemName, JSON.stringify(state));
  } catch (e) {
    // console.error(e);
  }
};

const loadFromLocalStorage = (storageItemName) => {
  try {
    const stateStr = localStorage.getItem(storageItemName);
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    // console.error(e);
    return undefined;
  }
};

const useUnload = (fn, state) => {
  const funct = partial(fn, state);
  const cb = useRef(funct);

  useEffect(() => {
    const onUnload = cb.current;
    
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);
};

export { loadFromLocalStorage,  saveToLocalStorage, useUnload};