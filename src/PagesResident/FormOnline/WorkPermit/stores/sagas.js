import { takeLatest, call } from "redux-saga/effects";
import { CREAT_FORM } from "./constants";

import { createFormService } from "../../../../api/form";

// create
function* createFormssaga({ payload, resolve }) {
  try {
    const response = yield call(createFormService, payload);
    resolve(response);
    console.log(response);
  } catch (error) {
    console.log(error);
    resolve(null);
  }
}
export function* createForms() {
  yield takeLatest(CREAT_FORM, createFormssaga);
}
