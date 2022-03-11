import { call, delay, takeLatest, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_LIST_TASK_SAGA,
  GET_LIST_USER,
  GET_LIST_USER_SAGA,
  USER_SIGNIN_API,
  USER_SIGNUP_API,
  USLOGIN,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import Swal from "sweetalert2";
import { history } from "../../../util/history";
import {
  ADD_USER_PROJECT_API,
  CLOSE_DRAWER,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  REMOVE_USER_PROJECT_API,
} from "../../constants/DrawerCons";
import { userService } from "../../../services/UserService";
import { GET_USER_SEARCH } from "../../constants/Cyberbugs/UserCons";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

function* signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);

  try {
    const { data } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );

    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push("/projectmanagement");
  } catch (err) {
    Swal.fire(err.response.data.message);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* signupSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(400);

  try {
    const { data } = yield call(() =>
      cyberbugsService.signupCyberBugs(action.userSignUp)
    );
    Swal.fire(data.message);
    history.push("/login");
  } catch (err) {
    Swal.fire(err.response.data.message);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignup() {
  yield takeLatest(USER_SIGNUP_API, signupSaga);
}

function* getUser(action) {
  try {
    const { data } = yield call(() => userService.getUser(action.keyword));

    yield put({
      type: GET_USER_SEARCH,
      lstUserSearch: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUser);
}

function* addUser(action) {
  try {
    yield call(() => userService.assignUserProject(action.userProject));

    yield put({
      type: GET_LIST_TASK_SAGA,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiAddUser() {
  yield takeLatest(ADD_USER_PROJECT_API, addUser);
}

function* removeUser(action) {
  try {
    yield call(() => userService.deleteUserFromProject(action.userProject));
    yield put({
      type: GET_LIST_TASK_SAGA,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiRemoveUser() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUser);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;

  try {
    const { data } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );

    yield put({
      type: GET_USER_BY_PROJECT_ID,
      arrAssignees: data.content,
    });
  } catch (err) {
    yield put({
      type: GET_USER_BY_PROJECT_ID,
      arrAssignees: [],
    });
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

function* getListUserSaga(action) {
  try {
    const { data } = yield call(() => userService.getListUser(action.keyWord));

    yield put({
      type: GET_LIST_USER,
      arrUser: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetListUser() {
  yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga);
}

// =================== EDIT USER ===================
function* editUser(action) {
  try {
    yield call(() => userService.editUser(action.userEdit));
    notifiFunction("success", "Edit User Successfully !");

    yield put({
      type: GET_LIST_USER_SAGA,
      keyWord: "",
    });

    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiEditUser() {
  yield takeLatest(EDIT_USER_SAGA, editUser);
}

// =================== DELETE USER ===================
function* deleteUser(action) {
  try {
    yield call(() => userService.deleteUser(action.userId));
    notifiFunction("success", "Delete User Successfully !");

    yield put({
      type: GET_LIST_USER_SAGA,
    });

    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoideleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUser);
}
