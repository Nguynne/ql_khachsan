import { takeLatest, call } from "redux-saga/effects";
import { CREAT_FEEDBACKS } from "./constants";
import { createFeedbacksService } from "../../../../api/apiUser";

// create
function* createFeedbacksaga({ payload, resolve }) {
  try {
    const response = yield call(createFeedbacksService, payload);
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
  }
}
export function* createFeedback() {
  yield takeLatest(CREAT_FEEDBACKS, createFeedbacksaga);
}
