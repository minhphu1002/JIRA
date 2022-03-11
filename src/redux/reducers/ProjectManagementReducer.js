import { GET_LIST_TASK } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  arrTaskList: [],
};

export const ProjectManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TASK:
      state.arrTaskList = action.projectList;
      return { ...state };

    default:
      return state;
  }
};
