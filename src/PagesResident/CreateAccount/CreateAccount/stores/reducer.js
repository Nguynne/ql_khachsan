import produce from "immer";
import { SAVE_LOADING } from "./constants";
import { INIT_STATE_CREATE_ACCOUNT } from "./state";

export default function createACCountReducers(
  state = INIT_STATE_CREATE_ACCOUNT,
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
