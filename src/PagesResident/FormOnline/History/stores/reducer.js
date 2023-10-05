import { INIT_STATE_FORM } from "./state";
import produce from "immer";

import { SAVE_LOADING, SAVE_FORM } from "./constants";

export default function formReducers(state = INIT_STATE_FORM, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_FORM:
        draft.dataForm = action.payload;
        break;

      default:
        return state;
    }
  });
}
