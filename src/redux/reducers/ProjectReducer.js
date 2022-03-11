import {
  EDIT_PROJECT,
  GET_PROJECT_DETAIL,
} from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "default",
    description: "default",
    categoryId: "",
  },
  projectDetail: {},
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      state.projectEdit = action.projectEdit;
      return { ...state };

    case GET_PROJECT_DETAIL:
      state.projectDetail = action.projectDetail;
      return { ...state };
    default:
      return state;
  }
};
