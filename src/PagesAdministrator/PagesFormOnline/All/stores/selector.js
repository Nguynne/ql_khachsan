// import { createSelector } from "reselect";
// import { INIT_STATE_FORMS } from "./state";

// const selectFormsData = (state) => state.formsReducers || INIT_STATE_FORMS;

// const selectForms = createSelector(
//   selectFormsData,
//   (state) => state.Froms || []
// );

// export { selectForms };
import { createSelector } from "reselect";
import { INIT_STATE_FORMS } from "./state";

const selectUser = (state) => state.formsReducers || INIT_STATE_FORMS;
const selectFormsData = createSelector(
  selectUser,
  (state) => state.Forms || []
);

export { selectFormsData };
