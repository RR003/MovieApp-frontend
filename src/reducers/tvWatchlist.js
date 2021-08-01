const tvWatchlist = (tvWatchlist = [], action) => {
  switch (action.type) {
    case "CREATE_WATCH_LIST_TV":
      return action.payload;

    case "ADD_TO_WL_TV":
      let list1 = tvWatchlist[0];
      let list2 = tvWatchlist[1];
      list1.push(action.payload[0]);
      list2.push(action.payload[1]);
      tvWatchlist = [list1, list2];
      return tvWatchlist;

    case "DELETE_TV_WATCH_LIST":
      let index = -1;
      console.log(action.payload);
      for (let i = 0; i < tvWatchlist[0].length; i++) {
        if (tvWatchlist[0][i].id === parseInt(action.payload)) index = i;
        else console.log(tvWatchlist[0][i].id);
      }

      console.log(index);
      tvWatchlist[0].splice(index, 1);
      tvWatchlist[1].splice(index, 1);
      // console.log(movieWatchlist);
      return tvWatchlist;
    default:
      return tvWatchlist;
  }
};

export default tvWatchlist;
