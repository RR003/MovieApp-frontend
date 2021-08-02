const auth = (auth = [], action) => {
  switch (action.type) {
    case "AUTH":
      return [action.payload.url];
    default:
      return auth;
  }
};

export default auth;
