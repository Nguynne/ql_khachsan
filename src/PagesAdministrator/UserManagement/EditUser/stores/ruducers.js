import { INIT_STATE_ACCOUNT_USER } from "./states";
import produce from "immer";

import {
  SAVE_LOADING,
  SAVE_ALL_PROFILE,
  SAVE_ALL_ROOM,
  SAVE_ALL_ROLE,
} from "./constants";

export default function editccountUserReducers(
  state = INIT_STATE_ACCOUNT_USER,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_PROFILE:
        draft.dataUserEdit = action.payload;
        break;
      case SAVE_ALL_ROLE:
        draft.dataRole = action.payload;
        break;
      case SAVE_ALL_ROOM:
        draft.dataRoom = action.payload;
        break;
      default:
        return state;
    }
  });
}
