import { call, takeLatest, put, select } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
} from "../../constants/CreateProjectCons";
import Swal from "sweetalert2";

import { taskService } from "../../../services/TaskService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/DrawerCons";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/Cyberbugs/Cyberbugs";

// =================== TASK TYPE API ===================
function* getTaskTypeAPI(action) {
  try {
    const { data } = yield call(() => projectService.getAllTaskType());

    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getTaskTypeAPI);
}

// =================== PRIORITY API ===================

function* getAllPrioritySaga(action) {
  try {
    const { data } = yield call(() => projectService.getAllPriority());

    yield put({ type: GET_ALL_PRIORITY, arrPriority: data.content });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetAllPriority() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}

// =================== STATUS API ===================

function* getAllStatusSaga(action) {
  try {
    const { data } = yield call(() => projectService.getAllStatus());

    yield put({ type: GET_ALL_STATUS, arrStatus: data.content });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}

// =================== CREATE TASK ===================

function* createTaskSaga(action) {
  try {
    yield call(() => taskService.createTask(action.taskObject));

    yield put({
      type: CLOSE_DRAWER,
    });

    yield put({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId: action.taskObject.projectId,
    });

    notifiFunction("success", "Create task successfully !");
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

// =================== GET TASK DETAIL SAGA ===================

function* getTaskDetailSaga(action) {
  const { taskId } = action;

  try {
    const { data } = yield call(() => taskService.getTaskDetail(taskId));

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiGetTaskDetailSaga(action) {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// =================== UPDATE TASK AND HANDLE CHANGE SAGA ===================

export function* handelChangePostApi(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;
        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
    default:
      return;
  }

  //Save qua api updateTaskSaga
  //Lây dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskDetailReducer);
  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    yield call(() => taskService.updateTask(taskUpdateApi));

    yield put({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId: taskUpdateApi.projectId,
    });

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: taskUpdateApi.taskId,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}
