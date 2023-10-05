import { combineReducers } from "redux";
import authenReducers from "../PagesAdministrator/Login/stores/reducer";
import accountUserReducers from "../PagesAdministrator/UserManagement/All/stores/ruducers";
import createaccountUserReducers from "../PagesAdministrator/UserManagement/CreateUser/stores/ruducers";
import editccountUserReducers from "../PagesAdministrator/UserManagement/EditUser/stores/ruducers";
import newReducer from "../PagesAdministrator/Login/stores/reducer";
import newsReducers from "./../PagesAdministrator/News/stores/reducer";
import createConfigReducers from "./../PagesAdministrator/Configuration/stores/ruducers";
import feedbacksReducers from "./../PagesAdministrator/Feedbacks/stores/ruducers";
import newsResidentReducers from "./../PagesResident/News/stores/ruducers";
import systemServicesReducers from "./../PagesAdministrator/SystemServices/stores/reducer";
import createFeedbackReducers from "./../PagesResident/Feedbacks/Feedbacks/stores/ruducers";
import notificationServicesReducers from "./../PagesResident/Notification/stores/reducer";
import listBookingServicesReducers from "./../PagesAdministrator/ListBookingService/stores/reducer";
import changePWReducers from "./../PagesResident/ChangePW/stores/ruducers";

import formsReducers from "../PagesAdministrator/PagesFormOnline/All/stores/reducer";
import createFormReducers from "../PagesResident/FormOnline/EquipmentGoodsMoving/stores/reducer";
import formReducers from "../PagesResident/FormOnline/History/stores/reducer";
import createFormsReducers from "../PagesResident/FormOnline/WorkPermit/stores/reducer";
import createACCountReducers from "../PagesResident/CreateAccount/CreateAccount/stores/reducer";
import ACCReducers from "../PagesResident/CreateAccount/ListAccount/stores/reducer";

export default function createReducer() {
  const rootReducer = combineReducers({
    authenReducers,
    accountUserReducers,
    createaccountUserReducers,
    editccountUserReducers,
    createConfigReducers,
    feedbacksReducers,
    newReducer,
    newsReducers,
    newsResidentReducers,
    systemServicesReducers,
    listBookingServicesReducers,
    createFeedbackReducers,
    notificationServicesReducers,
    changePWReducers,

    formsReducers,
    createFormReducers,
    formReducers,
    createFormsReducers,
    createACCountReducers,
    ACCReducers,
  });
  return rootReducer;
}
