import { takeLatest, call } from "redux-saga/effects";
import { setCookie } from "../../../utils/utils";
import { LOGIN_REQUEST } from "./constants";
import { loginService } from "../../../api/login";
function* loginRequestSaga({ payload, resolve }) {
  try {
    const response = yield call(loginService, payload);

    setCookie("token", response.data.result.token);
    setCookie("username", response.data.result.username);
    resolve(response.data);
  } catch (error) {
    resolve(null);
  }
}
export function* sagaNew() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
}
