import { takeLatest, call, put } from "redux-saga/effects";
import {
  saveAllProfileAction,
  saveLoading,
  saveRoleAction,
  saveRoomAction,
} from "./actions";
import {
  GET_ALL_PROFILE,
  GET_ALL_ROLE,
  GET_ALL_ROOM,
  EDIT_USER,
} from "./constants";
import {
  getProfileUserService,
  getRoleService,
  getRoomService,
  editUserService,
} from "../../../../api/apiUser";
// get
function* getAllProfilesaga({ payload, resolve }) {
  try {
    const res = yield call(getProfileUserService, payload);
    resolve(res.data.result);

    yield put(saveAllProfileAction(res.data.result));
  } catch (error) {
    console.log(error.message);
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
// edit
function* editUsersaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(editUserService, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* editUserAccount() {
  yield takeLatest(GET_ALL_PROFILE, getAllProfilesaga);
  yield takeLatest(GET_ALL_ROOM, getRoomSaga);
  yield takeLatest(GET_ALL_ROLE, getRoleSaga);
  yield takeLatest(EDIT_USER, editUsersaga);
}
