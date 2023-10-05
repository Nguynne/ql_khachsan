import { INIT_STATE_LIST_BOOKING_SERVICES } from './state';
import produce from "immer";

import { SAVE_ALL_LIST_BOOKING_SERVICES } from "./constants";

export default function listBookingServicesReducers(state = INIT_STATE_LIST_BOOKING_SERVICES, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_ALL_LIST_BOOKING_SERVICES:
                draft.listBookingServices = action.payload;
                break;
            default:
                return state;
        }
    });
}
