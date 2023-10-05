import { INIT_STATE_FORMS } from "./state";
import produce from "immer";

import { SAVE_ALL_FORMS } from "./constants";

export default function formsReducers(state = INIT_STATE_FORMS, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_ALL_FORMS:
        draft.Forms = action.payload;
        break;
      default:
        return state;
    }
  });
}
