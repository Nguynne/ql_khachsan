import { takeLatest, call, put } from "redux-saga/effects";
import {
  saveAllUserAction,
  saveLoading,
  saveRoleAction,
  saveRoomAction,
} from "./actions";
import {
  GET_ALL_USER,
  GET_ALL_ROLE,
  GET_ALL_ROOM,
  CREAT_USER,
} from "./constants";
import {
  getAllUserService,
  getRoleService,
  getRoomService,
  createUserService,
} from "../../../../api/apiUser";
// get
function* getAllUsersaga({ payload }) {
  try {
    const response = yield call(getAllUserService, payload);

    yield put(saveAllUserAction(response.data.result));
  } catch (error) {
    console.log(error);
  }
}

// get
function* getRoomSaga({ payload }) {
  try {
    const res = yield call(getRoomService, payload);
    yield put(saveRoomAction(res.data.result.data));
  } catch (error) {
    console.log(error);
  }
}
// get
function* getRoleSaga({ payload }) {
  try {
    const res = yield call(getRoleService, payload);
    yield put(saveRoleAction(res.data.result.data));
  } catch (error) {
    console.log(error);
  }
}
// create
function* createUsersaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(createUserService, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* createUserAccount() {
  yield takeLatest(GET_ALL_USER, getAllUsersaga);
  yield takeLatest(GET_ALL_ROOM, getRoomSaga);
  yield takeLatest(GET_ALL_ROLE, getRoleSaga);
  yield takeLatest(CREAT_USER, createUsersaga);
}
