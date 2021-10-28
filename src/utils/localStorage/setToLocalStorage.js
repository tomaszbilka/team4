export default (token, payload) => {
  if (window) {
    try {
      window.localStorage.setItem(token, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }
};
