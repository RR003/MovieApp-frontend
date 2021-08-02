import * as api from "../api";

// need to add way to check whether user has watched movie & other conditionals, figure out a systematic way to do so!
export const goToThisMovie = (movieId, router) => async () => {
  try {
    const rating = await api.getRatingsMovie(movieId);
    const movie = await api.getMovieInfo(movieId);
    const comments = await api.getCommentAndRatingMovie(movieId);

    router.push({
      pathname: "/movieInfo",
      state: {
        newState: movie.data,
        commentAndRatings: comments.data,
        ourRating: rating.data,
      },
    });
  } catch (error) {}
};

export const goToThisTv = (tvId, router) => async () => {
  try {
    const rating = await api.getRatingsTv(tvId);
    const tv = await api.getTvInfo(tvId);
    const comments = await api.getCommentAndRatingTv(tvId);
    router.push({
      pathname: "/tvInfo",
      state: {
        newState: tv.data,
        commentAndRatings: comments.data,
        ourRating: rating.data,
      },
    });
  } catch (error) {}
};
