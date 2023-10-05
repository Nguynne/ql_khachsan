import { createSelector } from "reselect";
import { INIT_STATE_NOTIFICATION_SERVICES } from "./state";

const selectNotificationServicesData = (state) =>
    state.notificationServicesReducers || INIT_STATE_NOTIFICATION_SERVICES;

const selectNotificationServices = createSelector(selectNotificationServicesData, (state) => state.notificationServices || {});

export { selectNotificationServices };
