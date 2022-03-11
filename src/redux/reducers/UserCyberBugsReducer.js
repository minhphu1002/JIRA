import {
  EDIT_USER,
  GET_LIST_USER,
  USLOGIN,
} from "../constants/Cyberbugs/Cyberbugs";
import { GET_USER_SEARCH } from "../constants/Cyberbugs/UserCons";

const { USER_LOGIN } = require("../../util/constants/settingSystem");

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
  userEdit: {
    userId: 0,
    email: "default",
    name: "default",
    phoneNumber: "default",
  },
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }

    case EDIT_USER:
      state.userEdit = action.userEdit;
      return { ...state };

    case GET_USER_SEARCH: {
      state.userSearch = action.lstUserSearch;
      return { ...state };
    }

    case GET_LIST_USER: {
      state.arrUser = action.arrUser;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
