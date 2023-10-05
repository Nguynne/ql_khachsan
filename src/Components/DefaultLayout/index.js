import routes from "../../routes";
import Header from "../Header/header";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./../../utils/utils";
import ResidentHeader from "./../Header/ResidentHeader/ResidentHeader";
import NavigationComponent from "../Header/NavigationComponent/NavigationComponent";
const DefaultLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //const user = localStorage.getItem("token");
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const showContentMenu = (routes) => {
    let result = null;
    if (routes) {
      result = routes.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={item.component()} />
        );
      });
    }
    return result;
  };
  const getpathname = window.location.pathname;
  const str = getpathname.slice(0, 15);
  if (str !== "/administrator/") {
    return (
      <div>
        <ResidentHeader>
          <Routes>{showContentMenu(routes)}</Routes>
        </ResidentHeader>
      </div>
    );
  } else {
    return (
      <div>
        {/* <Header>
          <Routes>{showContentMenu(routes)}</Routes>
        </Header> */}
        <NavigationComponent>
          <Routes>{showContentMenu(routes)}</Routes>
        </NavigationComponent>
      </div>
    );
  }
};

export default DefaultLayout;
