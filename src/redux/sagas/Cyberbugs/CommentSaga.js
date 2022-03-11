import { call, takeLatest, put} from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import {
  ADD_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  GET_TASK_DETAIL_SAGA,
} from "../../constants/CreateProjectCons";
import Swal from "sweetalert2";

// =================== GET ALL COMMENT ===================

function* getCommentApi(action) {
  try {
    yield call(() => commentService.getAllComment(action.taskId));
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoigetCommentApi() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getCommentApi);
}

// =================== INSERT COMMENT ===================

function* insertCommentApi(action) {
  try {
    yield call(() => commentService.insertComment(action.cmtObj));

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action.cmtObj.taskId,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiInsertCommentApi() {
  yield takeLatest(ADD_COMMENT_SAGA, insertCommentApi);
}

// =================== DELETE COMMENT ===================

function* deleteCommentApi(action) {
  try {
    yield call(() => commentService.deleteComment(action.idComment));

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action.taskId,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiDeleteCommentApi() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentApi);
}

// =================== EDIT COMMENT ===================

function* editCommentApi(action) {
  try {
    yield call(() =>
      commentService.editComment(action.idComment, action.contentCommentEdit)
    );

    yield put({
      type: GET_ALL_COMMENT,
      visibleEditor: false,
    });

    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action.taskId,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiEditCommentApi() {
  yield takeLatest(EDIT_COMMENT_SAGA, editCommentApi);
}
