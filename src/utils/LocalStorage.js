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

export { loadFromLocalStorage,  saveToLocalStorage};