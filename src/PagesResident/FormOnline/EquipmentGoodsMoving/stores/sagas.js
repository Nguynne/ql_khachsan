import { takeLatest, call } from "redux-saga/effects";
import { CREAT_FORM } from "./constants";

import { createFormService } from "../../../../api/form";

// create
function* createFormsaga({ payload, resolve }) {
  try {
    const response = yield call(createFormService, payload);
    resolve(response);
    console.log(response);
  } catch (error) {
    console.log(error);
    resolve(null);
  }
}
export function* createForm() {
  yield takeLatest(CREAT_FORM, createFormsaga);
}
