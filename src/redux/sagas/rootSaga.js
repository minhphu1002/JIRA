import { all } from "redux-saga/effects";
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as CategorySaga from "./Cyberbugs/CategorySaga";
import * as ProjectSaga from "./Cyberbugs/PropjectSaga";
import * as CreateTaskSaga from "./Cyberbugs/CreateTaskSaga";
import * as CommentSaga from "./Cyberbugs/CommentSaga";

export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiSignup(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUser(),
    Cyberbugs.theoDoiRemoveUser(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    Cyberbugs.theoDoiGetListUser(),
    Cyberbugs.theoDoiEditUser(),
    Cyberbugs.theoDoideleteUser(),

    CategorySaga.theoDoiLayCategory(),

    ProjectSaga.theoDoiLayCreateProject(),
    ProjectSaga.theoDoiLayDanhSach(),
    ProjectSaga.theoEditProject(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),

    CreateTaskSaga.theoDoiGetAllTaskType(),
    CreateTaskSaga.theoDoiGetAllPriority(),
    CreateTaskSaga.theoDoiGetAllStatus(),
    CreateTaskSaga.theoDoiCreateTaskSaga(),
    CreateTaskSaga.theoDoiGetTaskDetailSaga(),
    CreateTaskSaga.theoDoiHandleChangePostApi(),

    CommentSaga.theoDoigetCommentApi(),
    CommentSaga.theoDoiInsertCommentApi(),
    CommentSaga.theoDoiDeleteCommentApi(),
    CommentSaga.theoDoiEditCommentApi(),
  ]);
}
