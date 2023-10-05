import { takeLatest, call, put } from "redux-saga/effects";
import {
  saveLoading,
  saveNewResidentAction,
  saveDetailNewResidentAction,
} from "./actions";
import {
  SET_LOADING,
  GET_NEWS_RESIDENT,
  GET_DETAIL_NEWS_RESIDENT,
} from "./constants";
import { getNewsResident, getDetailNewsResident } from "./../../../api/apiUser";
//
function* Loadingsaga({ payload }) {
  try {
    yield put(saveLoading(payload));
  } catch (error) {
    console.log(error);
  }
}
// get
function* getNewResidentsaga({ payload, resolve }) {
  try {
    const response = yield call(getNewsResident, payload);
    resolve(response);
    yield put(saveNewResidentAction(response.data.result.data));
  } catch (error) {
    console.log(error);
    resolve(null);
  }
}
// get
function* getDetailNewResidentsaga({ payload }) {
  try {
    const response = yield call(getDetailNewsResident, payload);
    console.log(response.data.result);
    yield put(saveDetailNewResidentAction(response.data.result));
  } catch (error) {
    console.log(error);
  }
}
export function* newResidentAccount() {
  yield takeLatest(GET_NEWS_RESIDENT, getNewResidentsaga);
  yield takeLatest(GET_DETAIL_NEWS_RESIDENT, getDetailNewResidentsaga);
  yield takeLatest(SET_LOADING, Loadingsaga);
}
