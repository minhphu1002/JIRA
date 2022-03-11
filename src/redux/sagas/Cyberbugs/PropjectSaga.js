import { call, delay, takeLatest, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  GET_LIST_TASK,
  GET_LIST_TASK_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { history } from "../../../util/history";
import {
  CLOSE_DRAWER,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constants/DrawerCons";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import Swal from "sweetalert2";


// =================== GET TASK LIST PROJECT ===================
function* getListTask(action) {

  try {
    const { data } = yield call(() => cyberbugsService.getListProject());
    yield put({
      type: GET_LIST_TASK,
      projectList: data.content,
    });

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0].id,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiLayDanhSach() {
  yield takeLatest(GET_LIST_TASK_SAGA, getListTask);
}

// =================== EDIT PROJECT ===================
function* editProject(action) {
  try {
    yield call(() => cyberbugsService.updateProject(action.projectEdit));
    notifiFunction("success", "Edit project successfully !");

    yield put({
      type: GET_LIST_TASK_SAGA,
    });

    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err.response);
  }
}

export function* theoEditProject() {
  yield takeLatest(EDIT_PROJECT, editProject);
}

// =================== DELETE PROJECT ===================
function* deleteProject(action) {
  try {
    yield call(() => projectService.deleteProject(action.idProject));
    notifiFunction("success", "Delete project successfully !");
    yield put({
      type: GET_LIST_TASK_SAGA,
    });
  } catch (err) {
    notifiFunction("error", "Delete project fail !");
  }
}

export function* theoDoiDeleteProject() {
  yield takeLatest(DELETE_PROJECT, deleteProject);
}

// =================== GET PROJECT DETAIL ===================
function* getProjectDetail(action) {
  try {
    const { data } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );

    yield put({
      type: GET_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}

// =================== CREAT PROJECT ===================
function* createProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    notifiFunction("success", "Create project successfully !");

    history.push("/projectmanagement");
  } catch (err) {
    notifiFunction("error", "Create project fail !");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiLayCreateProject() {
  yield takeLatest(CREATE_PROJECT, createProject);
}
