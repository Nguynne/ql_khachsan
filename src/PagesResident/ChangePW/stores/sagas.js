import { takeLatest, call, put } from "redux-saga/effects";
import { saveLoading } from "./actions";
import { CHANGE_PW } from "./constants";
import { ChangePWService } from "../../../api/apiUser";

// create
function* createUsersaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(ChangePWService, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* changeAccount() {
  yield takeLatest(CHANGE_PW, createUsersaga);
}
