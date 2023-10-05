import { takeLatest, call, put } from "redux-saga/effects";
import {
  CREATE_FORMS,
  DELETE_FORMS,
  GET_ALL_FORMS,
  GET_DETAIL_FORMS,
  UPDATE_FORMS,
} from "./constants";
import { saveAllFormAction } from "./action";
import {
  createFormService,
  deleteFormService,
  getAllFormService,
  getDetailFormService,
  updateFormService,
} from "./../../../../api/form";
function* getAllFormsSaga({ payload }) {
  try {
    const response = yield call(getAllFormService, payload);
    console.log("res form");
    console.log(response.data.result);
    yield put(saveAllFormAction(response.data.result));
  } catch (error) {
    console.log("error");
  }
}

function* createFormsSaga({ payload, resolve }) {
  try {
    const response = yield call(createFormService, payload);
    resolve(response.status);
    console.log(response);
  } catch (error) {
    resolve(null);
  }
}

function* getDetailFormsSaga({ payload, resolve }) {
  try {
    const response = yield call(getDetailFormService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* updateFormsSaga({ payload, resolve }) {
  try {
    const response = yield call(updateFormService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* deleteFormsSaga({ payload, resolve }) {
  try {
    const response = yield call(deleteFormService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

export function* sagaForms() {
  yield takeLatest(GET_ALL_FORMS, getAllFormsSaga);
  yield takeLatest(CREATE_FORMS, createFormsSaga);
  yield takeLatest(GET_DETAIL_FORMS, getDetailFormsSaga);
  yield takeLatest(UPDATE_FORMS, updateFormsSaga);
  yield takeLatest(DELETE_FORMS, deleteFormsSaga);
}
