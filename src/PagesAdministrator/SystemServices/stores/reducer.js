import { INIT_STATE_SYSTEM_SERVICES } from './state';
import produce from "immer";

import { SAVE_ALL_SYSTEM_SERVICES } from "./constants";

export default function systemServicesReducers(state = INIT_STATE_SYSTEM_SERVICES, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_ALL_SYSTEM_SERVICES:
                draft.systemServices = action.payload;
                break;
            default:
                return state;
        }
    });
}
