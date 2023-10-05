import { INIT_STATE_NOTIFICATION_SERVICES } from './state';
import produce from "immer";

import { SAVE_ALL_NOTIFICATION_SERVICES } from "./constants";

export default function notificationServicesReducers(state = INIT_STATE_NOTIFICATION_SERVICES, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_ALL_NOTIFICATION_SERVICES:
                draft.notificationServices = action.payload;
                break;
            default:
                return state;
        }
    });
}
