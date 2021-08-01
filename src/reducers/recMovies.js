const recMovies = (recMovies = [], action) => {
  switch (action.type) {
    case "SET_REC_MOVIES":
      return action.payload;
    default:
      return recMovies;
  }
};

export default recMovies;
