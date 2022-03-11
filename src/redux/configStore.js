import { applyMiddleware, combineReducers, createStore } from "redux";
import LoadingReducer from "./reducers/LoadingReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import reduxThunk from "redux-thunk";

//middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { ProjectManagementReducer } from "./reducers/ProjectManagementReducer";
import { DrawerReducer } from "./reducers/DrawerReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { CreateTaskReducer } from "./reducers/CreateTaskReducer";
import { TaskDetailReducer } from "./reducers/TaskDetailReducer";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  LoadingReducer,
  ModalReducer,
  HistoryReducer,
  UserLoginCyberBugsReducer,
  CategoryReducer,
  ProjectManagementReducer,
  DrawerReducer,
  ProjectReducer,
  CreateTaskReducer,
  TaskDetailReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

middleWareSaga.run(rootSaga);

export default store;
