import React from "react";
import ErroPage from "./PagesAdministrator/Erropage/ErroPage";
import Login from "./PagesAdministrator/Login/index";
import NewsPage from "./PagesAdministrator/News/index";
import NewsForm from "./PagesAdministrator/News/NewsForm/NewsForm";
import SystemServices from "./PagesAdministrator/SystemServices";
import SystemServicesForm from "./PagesAdministrator/SystemServices/SystemServicesForm/SystemServicesForm";
import Users from "./PagesAdministrator";
import CreateUser from "./PagesAdministrator/UserManagement/CreateUser";
import EditUser from "./PagesAdministrator/UserManagement/EditUser";
import Configuration from "./PagesAdministrator/Configuration";
import Feedbacks from "./PagesAdministrator/Feedbacks";
import NewsResident from "./PagesResident/News/index";
import Detail from "./PagesResident/News/detail";
import ListBookingService from "./PagesAdministrator/ListBookingService";
import FacilityBooking from "./PagesResident/FacilityBooking/Booking";
import ChangePW from "./PagesResident/ChangePW";
import FeedbackResident from "./PagesResident/Feedbacks";

import FormsPage from "./PagesAdministrator/PagesFormOnline/All";
import FromsResident from "./PagesResident/FormOnline";
import ACCResident from "./PagesResident/CreateAccount";
const routes = [
  {
    path: "/*",
    component: () => <ErroPage />,
  },
  {
    path: "/login",
    component: () => <Login />,
  },
  {
    path: "/administrator/users",
    component: () => <Users />,
  },
  {
    path: "/administrator/news",
    component: () => <NewsPage />,
  },
  {
    path: "/administrator/news/create",
    component: () => <NewsForm onCreate={true} />,
  },
  {
    path: "/administrator/news/edit/:id",
    component: () => <NewsForm onCreate={false} />,
  },
  {
    path: "/administrator/users/createuser",
    component: () => <CreateUser />,
  },
  {
    path: "/administrator/users/edit/:id",
    component: () => <EditUser />,
  },
  {
    path: "/administrator/news",
    component: () => <NewsPage />,
  },
  {
    path: "/administrator/news/create",
    component: () => <NewsForm onCreate={true} />,
  },
  {
    path: "/administrator/news/edit/:id",
    component: () => <NewsForm onCreate={false} />,
  },
  {
    path: "/administrator/services/system",
    component: () => <SystemServices />,
  },
  {
    path: "/administrator/services/system/create",
    component: () => <SystemServicesForm onCreate={true} />,
  },
  {
    path: "/administrator/services/system/edit/:id",
    component: () => <SystemServicesForm onCreate={false} />,
  },
  {
    path: "/administrator/services/booking",
    component: () => <ListBookingService />,
  },
  {
    path: "/administrator/config",
    component: () => <Configuration />,
  },
  {
    path: "/administrator/config",
    component: () => <Configuration />,
  },
  {
    path: "/administrator/feedbacks",
    component: () => <Feedbacks />,
  },
  {
    path: "/resident/feedbacks",
    component: () => <FeedbackResident />,
  },
  {
    path: "/administrator/form-online",
    component: () => <FormsPage />,
  },
  {
    path: "/resident/formonlineresident",
    component: () => <FromsResident />,
  },

  {
    path: "/resident/news",
    component: () => <NewsResident />,
  },
  {
    path: "/resident/news/:id",
    component: () => <Detail />,
  },
  {
    path: "/administrator/system",
    component: () => <SystemServices />,
  },
  {
    path: "/administrator/system/create",
    component: () => <SystemServicesForm onCreate={true} />,
  },
  {
    path: "/administrator/system/edit/:id",
    component: () => <SystemServicesForm onCreate={false} />,
  },
  {
    path: "/resident/facilitybooking",
    component: () => <FacilityBooking />,
  },
  {
    path: "resident/changepassword",
    component: () => <ChangePW />,
  },
  {
    path: "/administrator/form-online",
    component: () => <FormsPage />,
  },
  {
    path: "/resident/formonlineresident",
    component: () => <FromsResident />,
  },
  {
    path: "/resident/createResident",
    component: () => <ACCResident />,
  },
];
export default routes;
