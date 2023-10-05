import { takeLatest, call, put } from "redux-saga/effects";
import { saveAllListBookingServicesAction } from "./action";
import { GET_ALL_LIST_BOOKING_SERVICES } from "./constants";
import { getAllListBookingServicesService } from "./../../../api/listBookingServices";

function* getAllListBookingServicesSaga({ payload, resolve }) {
  try {
    const response = yield call(getAllListBookingServicesService, payload);
    resolve(response.status);
    yield put(saveAllListBookingServicesAction(response.data.result));
  } catch (error) {
    console.log("error");
    resolve(null);
  }
}

export function* sagaListBookingServices() {
  yield takeLatest(
    GET_ALL_LIST_BOOKING_SERVICES,
    getAllListBookingServicesSaga
  );
}
