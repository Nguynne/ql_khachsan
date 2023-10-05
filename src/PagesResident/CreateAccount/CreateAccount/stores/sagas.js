import { takeLatest, call } from "redux-saga/effects";
import { createAccountService } from "../../../../api/Residence";
import { CREAT_ACCOUNT } from "./constants";

// create
function* createAccountsaga({ payload, resolve }) {
  try {
    const response = yield call(createAccountService, payload);
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
  }
}
export function* createACCount() {
  yield takeLatest(CREAT_ACCOUNT, createAccountsaga);
}
