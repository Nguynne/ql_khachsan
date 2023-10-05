import { takeLatest, call, put } from "redux-saga/effects";
import { saveLoading, saveFeedbacksAction } from "./actions";
import { GET_FEEDBACKS } from "./constants";
import { getFeedbanksService } from "./../../../api/apiUser";

// get
function* getFeedbackssaga({ payload }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(getFeedbanksService, payload);
    console.log(response);
    yield put(saveFeedbacksAction(response.data.result));
    yield put(saveLoading(true));
  } catch (error) {
    console.log(error);
  }
}

export function* feedbacksAccount() {
  yield takeLatest(GET_FEEDBACKS, getFeedbackssaga);
}
