import { takeLatest, call, put } from 'redux-saga/effects';
import { saveAllNotificationServicesAction } from './action';
import { GET_ALL_NOTIFICATION_SERVICES } from './constants';
import { getAllNotificationServicesService } from './../../../api/notificationServices';

function* getAllNotificationServicesSaga({ payload, resolve }) {
    try {
        const response = yield call(getAllNotificationServicesService, payload);
        resolve(response.status);
        yield put(saveAllNotificationServicesAction(response.data.result));

    } catch (error) {
        console.log("error");
        resolve(null);
    }
}

export function* sagaNotificationServices() {
    yield takeLatest(GET_ALL_NOTIFICATION_SERVICES, getAllNotificationServicesSaga)
}