export default (token) => {
  if (window) {
    try {
      const username = JSON.parse(window.localStorage.getItem(token));

      return username || null;
    } catch (err) {
      console.error(err);

      return null;
    }
  }
};
