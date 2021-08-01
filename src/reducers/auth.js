const auth = (auth = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", action.payload);
      return { ...auth, authData: action?.data };
    default:
      auth = localStorage.getItem("profile");
      return auth;
  }
};

export default auth;
