import { INIT_STATE_CREATE_FEEDBACK } from "./states";
import produce from "immer";

import { SAVE_LOADING } from "./constants";

export default function createFeedbackReducers(
  state = INIT_STATE_CREATE_FEEDBACK,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;

      default:
        return state;
    }
  });
}
