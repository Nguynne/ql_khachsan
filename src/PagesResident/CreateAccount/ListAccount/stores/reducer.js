import { INIT_STATE_ACC } from "./state";
import produce from "immer";

import { SAVE_LOADING, SAVE_ACCOUNT } from "./constants";

export default function ACCReducers(state = INIT_STATE_ACC, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ACCOUNT:
        draft.dataACC = action.payload;
        break;

      default:
        return state;
    }
  });
}
