export const getFromLocalStorage = (token) => {
  if (window) {
    try {
      const data = JSON.parse(window.localStorage.getItem(token));

      return data || null;
    } catch (err) {
      console.error(err);

      return null;
    }
  }
};

export const setToLocalStorage = (token, payload) => {
  if (window) {
    try {
      window.localStorage.setItem(token, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }
};

export const removeFromLocalStorage = (token) => {
  if (window) {
    try {
      window.localStorage.removeItem(token);
    } catch (err) {
      console.error(err);
    }
  }
};
