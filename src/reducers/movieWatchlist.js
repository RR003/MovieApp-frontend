const movieWatchlist = (movieWatchlist = [], action) => {
  switch (action.type) {
    case "CREATE_WATCH_LIST_MOVIE":
      return action.payload;

    case "ADD_TO_WL_MOVIE":
      let list1 = movieWatchlist[0];
      let list2 = movieWatchlist[1];
      list1.push(action.payload[0]);
      list2.push(action.payload[1]);
      movieWatchlist = [list1, list2];
      return movieWatchlist;
    case "DELETE_MOVIE_WATCH_LIST":
      // console.log(action.payload, movieWatchlist);
      // console.log(movieWatchlist[0].length);
      let index = -1;
      for (let i = 0; i < movieWatchlist[0].length; i++) {
        if (movieWatchlist[0][i].id === parseInt(action.payload)) index = i;
        else console.log(movieWatchlist[0][i].id);
      }
      // console.log(index);
      movieWatchlist[0].splice(index, 1);
      movieWatchlist[1].splice(index, 1);
      // console.log(movieWatchlist);
      return movieWatchlist;
    default:
      return movieWatchlist;
  }
};

export default movieWatchlist;
