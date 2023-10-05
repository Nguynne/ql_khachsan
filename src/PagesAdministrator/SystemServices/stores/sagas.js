import { takeLatest, call, put } from 'redux-saga/effects';
import { saveAllSystemServicesAction } from './action';
import {
  CREATE_SYSTEM_SERVICES,
  DELETE_SYSTEM_SERVICES,
  GET_ALL_SYSTEM_SERVICES,
  GET_DETAIL_SYSTEM_SERVICES,
  GET_RULES_SYSTEM_SERVICES,
  UPDATE_SYSTEM_SERVICES
} from './constants';
import {
  getAllSystemServicesService,
  createSystemServicesService,
  getDetailSystemServicesService,
  updateSystemServicesService,
  deleteSystemServicesService,
  getRulesSystemServicesService
} from './../../../api/systemServices';

function* getAllSystemServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(getAllSystemServicesService, payload);
    resolve(response.status);
    yield put(saveAllSystemServicesAction(response.data.result));
  } catch (error) {
    console.log("error");
    resolve(null);
  }
}

function* createSystemServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(createSystemServicesService, payload);
    resolve(response.status);
  } catch (error) {
    resolve(null);
  }
}

function* getDetailSystemServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(getDetailSystemServicesService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* updateSystemServicesSaga({ payload, resolve }) {
  try {
    console.log("jump to saga");
    const response = yield call(updateSystemServicesService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* deleteSystemServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(deleteSystemServicesService, payload);
    resolve(response);
  } catch (error) {
    resolve(null);
  }
}

function* getRulesSystemServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(getRulesSystemServicesService, payload)
    resolve(response)
  } catch (error) {
    resolve(null);
  }
}

export function* sagaSystemServices() {
  yield takeLatest(GET_ALL_SYSTEM_SERVICES, getAllSystemServicesSaga)
  yield takeLatest(CREATE_SYSTEM_SERVICES, createSystemServicesSaga)
  yield takeLatest(GET_DETAIL_SYSTEM_SERVICES, getDetailSystemServicesSaga)
  yield takeLatest(UPDATE_SYSTEM_SERVICES, updateSystemServicesSaga)
  yield takeLatest(DELETE_SYSTEM_SERVICES, deleteSystemServicesSaga)
  yield takeLatest(GET_RULES_SYSTEM_SERVICES, getRulesSystemServicesSaga)
}
