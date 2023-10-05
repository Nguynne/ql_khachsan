import {
  SET_LOADING,
  SAVE_LOADING,
  GET_FEEDBACKS,
  SAVE_FEEDBACKS,
  DELETE_FEEDBACKS,
  GET_DETAIL_FEEDBACKS,
  SAVE_DETAIL_FEEDBACKS,
  REPLY_FEEDBACKS,
} from "./constants";
// loading
export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}
// get
export function getFeedbacksAction(payload) {
  return {
    type: GET_FEEDBACKS,
    payload,
  };
}
export const asyncGetFeedbacksAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_FEEDBACKS, payload, resolve }));
export function saveFeedbacksAction(payload) {
  return {
    type: SAVE_FEEDBACKS,
    payload,
  };
}
// delete
export const asyncDeleteFeedbacksAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: DELETE_FEEDBACKS, payload, resolve });
  });
};
// get
export const asyncGetDetailFeedbacksAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: GET_DETAIL_FEEDBACKS, payload, resolve });
  });
};
export function saveDetailFeedbacksAction(payload) {
  return {
    type: SAVE_DETAIL_FEEDBACKS,
    payload,
  };
}
// reply
export const asyncReplyFeedbacksAction = (dispatch) => (id, payload) => {
  return new Promise((resolve) => {
    dispatch({ type: REPLY_FEEDBACKS, id, payload, resolve });
  });
};
