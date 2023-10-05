import { createSelector } from "reselect";
import { INIT_STATE_CREATE_FORM } from "./state";

const selectForm = (state) =>
  state.createFormReducers || INIT_STATE_CREATE_FORM;

const selectLoading = createSelector(selectForm, (state) => state.isLoading);
const selectDataForm = createSelector(selectForm, (state) => state.dataForm);
const selectDataRoom = createSelector(selectForm, (state) => state.dataRoom);
const selectDataRole = createSelector(selectForm, (state) => state.dataRole);

export { selectLoading, selectDataForm, selectDataRole, selectDataRoom };
