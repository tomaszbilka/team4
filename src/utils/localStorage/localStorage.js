export const getUserFromLocalStorage = (token) => {
  if (window) {
    try {
      const username = window.localStorage.getItem(token);

      return username || null;
    } catch (err) {
      console.error(err);

      return null;
    }
  }
};

export const setUserForLocalStorage = (token, username) => {
  if (window) {
    try {
      window.localStorage.setItem(token, username);
    } catch (err) {
      console.error(err);
    }
  }
};

export const removeUserFromLocalStorage = (token) => {
  if (window) {
    try {
      window.localStorage.removeItem(token);
    } catch (err) {
      console.error(err);
    }
  }
};
