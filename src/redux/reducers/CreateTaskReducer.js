import {
  GET_ALL_PRIORITY,
  GET_ALL_STATUS,
  GET_ALL_TASK_TYPE,
} from "../constants/CreateProjectCons";
import { GET_LIST_TASK } from "../constants/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECT_ID } from "../constants/DrawerCons";

const initialState = {
  arrTaskList: [],
  arrTaskType: [],
  arrPriority: [],
  arrStatus: [],
  arrAssignees: [],
};

export const CreateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TASK:
      return { ...state, arrTaskList: action.projectList };

    case GET_ALL_TASK_TYPE:
      return { ...state, arrTaskType: action.arrTaskType };

    case GET_ALL_PRIORITY:
      return { ...state, arrPriority: action.arrPriority };

    case GET_ALL_STATUS:
      return { ...state, arrStatus: action.arrStatus };

    case GET_USER_BY_PROJECT_ID:
      return { ...state, arrAssignees: action.arrAssignees };
    default:
      return state;
  }
};
