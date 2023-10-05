import { createSelector } from "reselect";
import { INIT_STATE_ACC } from "./state";

const selectACC = (state) => state.ACCReducers || INIT_STATE_ACC;

const selectLoading = createSelector(selectACC, (state) => state.isLoading);
const selectDataACC = createSelector(selectACC, (state) => state.dataACC || []);

export { selectLoading, selectDataACC };
