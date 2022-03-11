const initialState = {
  arrCategory: [],
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY":
      state.arrCategory = action.data;
      return { ...state };

    default:
      return state;
  }
};
