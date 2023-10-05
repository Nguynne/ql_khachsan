import { createSelector } from "reselect";
import { INIT_STATE_SYSTEM_SERVICES } from "./state";

const selectSystemServicesData = (state) =>
    state.systemServicesReducers || INIT_STATE_SYSTEM_SERVICES;

const selectSystemServices = createSelector(selectSystemServicesData, (state) => state.systemServices || {});

export { selectSystemServices };
