import { INIT_STATE_NEWS } from "./state";
import produce from "immer";

import { SAVE_ALL_NEWS } from "./constants";

export default function newsReducers(state = INIT_STATE_NEWS, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_ALL_NEWS:
        draft.news = action.payload;
        break;
      default:
        return state;
    }
  });
}
