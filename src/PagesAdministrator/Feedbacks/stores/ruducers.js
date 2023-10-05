import { INIT_STATE_FEEDBACKS } from "./states";
import produce from "immer";

import {
  SAVE_LOADING,
  SAVE_FEEDBACKS,
  SAVE_DETAIL_FEEDBACKS,
} from "./constants";

export default function feedbacksReducers(
  state = INIT_STATE_FEEDBACKS,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_FEEDBACKS:
        draft.dataUser = action.payload;
        break;
      case SAVE_DETAIL_FEEDBACKS:
        draft.dataDetail = action.payload;
        break;
      default:
        return state;
    }
  });
}
