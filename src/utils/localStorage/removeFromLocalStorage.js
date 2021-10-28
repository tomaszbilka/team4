export default (token) => {
  if (window) {
    try {
      window.localStorage.removeItem(token);
    } catch (err) {
      console.error(err);
    }
  }
};
