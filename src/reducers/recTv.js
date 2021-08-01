const recTv = (recTv = [], action) => {
  switch (action.type) {
    case "SET_REC_TV":
      return action.payload;
    default:
      return recTv;
  }
};

export default recTv;
