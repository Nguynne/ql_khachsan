import { all } from "redux-saga/effects";
import { sagaNews } from "../PagesAdministrator/News/stores/sagas";
import { sagaNew } from "../PagesAdministrator/Login/stores/sagas";
import { allUserAccount } from "../PagesAdministrator/UserManagement/All/stores/sagas";
import { createUserAccount } from "../PagesAdministrator/UserManagement/CreateUser/stores/sagas";
import { editUserAccount } from "../PagesAdministrator/UserManagement/EditUser/stores/sagas";
import { createConfig } from "../PagesAdministrator/Configuration/stores/sagas";
import { feedbacksAccount } from "../PagesAdministrator/Feedbacks/stores/sagas";
import { newResidentAccount } from "../PagesResident/News/stores/sagas";
import { sagaSystemServices } from "../PagesAdministrator/SystemServices/stores/sagas";
import { createFeedback } from "../PagesResident/Feedbacks/Feedbacks/stores/sagas";
import { sagaNotificationServices } from "../PagesResident/Notification/stores/sagas";
import { sagaListBookingServices } from "../PagesAdministrator/ListBookingService/stores/sagas";
import { changeAccount } from "../PagesResident/ChangePW/stores/sagas";

import { sagaForms } from "../PagesAdministrator/PagesFormOnline/All/stores/sagas";
import { createForm } from "../PagesResident/FormOnline/EquipmentGoodsMoving/stores/sagas";
import { formAccount } from "../PagesResident/FormOnline/History/stores/sagas";
import { createForms } from "../PagesResident/FormOnline/WorkPermit/stores/sagas";
import { createACCount } from "../PagesResident/CreateAccount/CreateAccount/stores/sagas";
import { ACCAccount } from "../PagesResident/CreateAccount/ListAccount/stores/sagas";

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    // login saga
    sagaNew(),
    sagaNews(),
    allUserAccount(),
    createUserAccount(),
    editUserAccount(),
    createConfig(),
    feedbacksAccount(),
    newResidentAccount(),
    createFeedback(),
    sagaListBookingServices(),
    sagaSystemServices(),
    createFeedback(),
    sagaNotificationServices(),
    changeAccount(),

    sagaForms(),
    createForm(),
    formAccount(),
    createForms(),
    createACCount(),
    ACCAccount(),
  ]);
}
