import { INIT_STATE_CHANGE_PASS } from "./states";
import produce from "immer";

import { SAVE_LOADING } from "./constants";

export default function changePWReducers(
  state = INIT_STATE_CHANGE_PASS,
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
