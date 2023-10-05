import { takeLatest, call, put } from "redux-saga/effects";
import { getAllFormService } from "../../../../api/form";
import { saveFormAction } from "./action";
import { GET_FORM } from "./constants";

function* getFormsaga({ payload }) {
  try {
    const response = yield call(getAllFormService, payload);

    yield put(saveFormAction(response.data.result));
  } catch (error) {
    console.log(error);
  }
}

export function* formAccount() {
  yield takeLatest(GET_FORM, getFormsaga);
}
