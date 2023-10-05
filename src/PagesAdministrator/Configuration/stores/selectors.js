import { createSelector } from "reselect";
import { INIT_STATE_CREATE_CONFIG } from "./states";

const selectUser = (state) =>
  state.createConfigReducers || INIT_STATE_CREATE_CONFIG;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectData = createSelector(selectUser, (state) => state.data);
export { selectLoading, selectData };
