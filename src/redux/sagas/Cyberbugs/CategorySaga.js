import { call, takeLatest, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_CATEGORY,
} from "../../constants/Cyberbugs/Cyberbugs";
import Swal from "sweetalert2";

function* getCategory() {
  try {
    const { data } = yield call(() => cyberbugsService.getAllProjectCategory());

    yield put({
      type: GET_CATEGORY,
      data: data.content,
    });
  } catch (err) {
    Swal.fire(err.response.data.message);
  }
}

export function* theoDoiLayCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getCategory);
}
