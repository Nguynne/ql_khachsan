import { createSelector } from "reselect";
import { INIT_STATE_LIST_BOOKING_SERVICES } from "./state";

const selectListBookingServicesData = (state) =>
    state.listBookingServicesReducers || INIT_STATE_LIST_BOOKING_SERVICES;

const selectListBookingServices = createSelector(selectListBookingServicesData, (state) => state.listBookingServices || {});

export { selectListBookingServices };
