import { INIT_STATE_CREATE_CONFIG } from "./states";
import produce from "immer";

import { SAVE_CONFIG, SAVE_LOADING } from "./constants";

export default function createConfigReducers(
  state = INIT_STATE_CREATE_CONFIG,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_CONFIG:
        draft.data = action.payload;
        break;
      default:
        return state;
    }
  });
}
