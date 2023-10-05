import { takeLatest, call, put } from "redux-saga/effects";
import { getAllAccountService } from "../../../../api/Residence";
import { saveAccountAction } from "./action";
import { GET_ACCOUNT } from "./constants";

function* getACCsaga({ payload }) {
  try {
    const response = yield call(getAllAccountService, payload);

    yield put(saveAccountAction(response.data.result));
  } catch (error) {
    console.log(error);
  }
}

export function* ACCAccount() {
  yield takeLatest(GET_ACCOUNT, getACCsaga);
}
