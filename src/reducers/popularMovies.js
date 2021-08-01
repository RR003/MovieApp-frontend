const popularMovies = (popularMovie = [], action) => {
  switch (action.type) {
    case "CREATE_POPULAR_MOVIE":
      return [...popularMovie, action.payload];
    default:
      return popularMovie;
  }
};

export default popularMovies;
