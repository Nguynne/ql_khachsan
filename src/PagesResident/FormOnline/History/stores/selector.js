import { createSelector } from "reselect";
import { INIT_STATE_FORM } from "./state";

const selectForm = (state) => state.formReducers || INIT_STATE_FORM;

const selectLoading = createSelector(selectForm, (state) => state.isLoading);
const selectDataForm = createSelector(
  selectForm,
  (state) => state.dataForm || []
);

export { selectLoading, selectDataForm };
