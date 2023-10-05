import { takeLatest, call, put } from "redux-saga/effects";
import {
  saveLoading,
  saveFeedbacksAction,
  saveDetailFeedbacksAction,
} from "./actions";
import {
  DELETE_FEEDBACKS,
  GET_FEEDBACKS,
  REPLY_FEEDBACKS,
  GET_DETAIL_FEEDBACKS,
} from "./constants";
import {
  getFeedbanksService,
  deleteFeedbacksService,
  getDetailFeedbanksService,
  getReplyFeedbanksService,
} from "./../../../api/apiUser";

// get
function* getFeedbackssaga({ payload }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(getFeedbanksService, payload);

    yield put(saveFeedbacksAction(response.data.result));
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
  }
}
// delete
function* deleteFeedbacksSaga({ payload, resolve }) {
  try {
    const res = yield call(deleteFeedbacksService, payload);
    resolve(res.status);
  } catch (error) {
    console.log(error);
  }
}
// get
function* getDetailFeedbackssaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const res = yield call(getDetailFeedbanksService, payload);
    resolve(res.data.result);
    yield put(saveDetailFeedbacksAction(res.data.result));
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error.message);
  }
}
// reply
function* replyFeedbackssaga({ id, payload, resolve }) {
  try {
    const response = yield call(getReplyFeedbanksService, id, payload);
    resolve(response);
  } catch (error) {
    console.log(error);
  }
}
export function* feedbacksAccount() {
  yield takeLatest(GET_FEEDBACKS, getFeedbackssaga);
  yield takeLatest(DELETE_FEEDBACKS, deleteFeedbacksSaga);
  yield takeLatest(GET_DETAIL_FEEDBACKS, getDetailFeedbackssaga);
  yield takeLatest(REPLY_FEEDBACKS, replyFeedbackssaga);
}
