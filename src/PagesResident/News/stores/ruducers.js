import { INIT_STATE_NEWS_RESIDENT } from "./states";
import produce from "immer";

import {
  SAVE_LOADING,
  SAVE_NEWS_RESIDENT,
  SAVE_DETAIL_NEWS_RESIDENT,
} from "./constants";

export default function newsResidentReducers(
  state = INIT_STATE_NEWS_RESIDENT,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_NEWS_RESIDENT:
        draft.dataNewsResident = action.payload;
        break;
      case SAVE_DETAIL_NEWS_RESIDENT:
        draft.dataDetailNews = action.payload;
        break;

      default:
        return state;
    }
  });
}
