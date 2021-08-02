const user = (user = [], action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      // console.log(action.payload);
      // sessionStorage.setItem("user", JSON.stringify(action.payload));
      return [action.payload];

    case "ADD_TO_WATCH_LIST_MOVIE":
      let wl = user[0].watchList;
      wl.push(action.payload);
      user[0].watchList = wl;
      return user;

    case "ADD_TO_WATCH_LIST_TV":
      let wl2 = user[0].tvWatchList;
      wl2.push(action.payload);
      user[0].tvWatchList = wl2;
      return user;

    case "DELETE_MOVIE":
      let index = -1;
      let watchList = user[0].watchList;
      for (let i = 0; i < watchList.length; i++) {
        if (watchList[i] === parseInt(action.payload)) index = i;
      }
      // console.log(index);
      watchList.splice(index, 1);
      user[0].watchList = watchList;
      return user;

    case "DELETE_TV":
      let index2 = -1;
      let watchList2 = user[0].tvWatchList;
      for (let i = 0; i < watchList2.length; i++) {
        if (watchList2[i] === parseInt(action.payload)) index2 = i;
      }
      // console.log(index);
      watchList2.splice(index2, 1);
      user[0].tvWatchList = watchList2;
      return user;

    case "EDIT_WATCHED_LIST":
      let watchedlist = user[0].watchedList;
      let findIndex = -1;

      for (let i = 0; i < watchedlist.length; i++) {
        if (watchedlist[i].movieId === action.payload.id) findIndex = i;
      }

      watchedlist[findIndex].comment = action.payload.comment;
      watchedlist[findIndex].rating = action.payload.rating;

      user[0].watchedList = watchedlist;
    default:
      return user;
  }
};

export default user;
