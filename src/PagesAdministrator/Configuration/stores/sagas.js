import { takeLatest, call, put } from "redux-saga/effects";
import { saveLoading, saveConfigAction } from "./actions";
import { CREAT_CONFIG, GET_CONFIG } from "./constants";
import { createConfigService, getConfigService } from "../../../api/apiUser";
// create
function* createConfigsaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(createConfigService, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}

function* getConfigsaga({ payload, resolve }) {
  try {
    const res = yield call(getConfigService, payload);
    resolve(res.data.result);

    yield put(saveConfigAction(res.data.result));
  } catch (error) {
    console.log(error.message);
  }
}
export function* createConfig() {
  yield takeLatest(CREAT_CONFIG, createConfigsaga);
  yield takeLatest(GET_CONFIG, getConfigsaga);
}
