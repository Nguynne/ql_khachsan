import { takeLatest, call, put } from "redux-saga/effects";
import { saveAllNewsAction } from "./action";
import {
  CREATE_NEWS,
  DELETE_NEWS,
  GET_ALL_NEWS,
  GET_DETAIL_NEWS,
  UPDATE_NEWS,
} from "./constants";
import {
  getAllNewsService,
  createNewsService,
  getDetailNewsService,
  updateNewsService,
  deleteNewsService,
} from "./../../../api/news";

function* getAllNewsSaga({ payload, resolve }) {
  try {
    const response = yield call(getAllNewsService, payload);
    resolve(response.status);
    //console.log(response.data);
    yield put(saveAllNewsAction(response.data.result));
  } catch (error) {
    console.log("error");
    resolve(null);
  }
}

function* createNewsSaga({ payload, resolve }) {
  try {
    const response = yield call(createNewsService, payload);
    resolve(response.status);
  } catch (error) {
    resolve(null);
  }
}

function* getDetailNewsSaga({ payload, resolve }) {
  try {
    const response = yield call(getDetailNewsService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* updateNewsSaga({ payload, resolve }) {
  try {
    const response = yield call(updateNewsService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* deleteNewsSaga({ payload, resolve }) {
  try {
    const response = yield call(deleteNewsService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

export function* sagaNews() {
  yield takeLatest(GET_ALL_NEWS, getAllNewsSaga);
  yield takeLatest(CREATE_NEWS, createNewsSaga);
  yield takeLatest(GET_DETAIL_NEWS, getDetailNewsSaga);
  yield takeLatest(UPDATE_NEWS, updateNewsSaga);
  yield takeLatest(DELETE_NEWS, deleteNewsSaga);
}
