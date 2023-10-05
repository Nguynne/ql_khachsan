import {
  CheckCircleOutlined,
  CoffeeOutlined,
  ControlOutlined,
  EditOutlined,
  FileDoneOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  PoweroffOutlined,
  GlobalOutlined,
  TableOutlined,
  CiCircleFilled,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Modal } from "antd";
import "antd/dist/antd.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "antd/lib/modal/style/index.css";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { delCookie } from "../../utils/utils";
import { useTranslation } from "react-i18next";
const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children, theme) {
  return {
    key,
    icon,
    children,
    label,
    theme,
  };
}

const items = [
  getItem(
    <Link to={"/administrator/dashboard"} className="noneLink">
      Dashboard
    </Link>,
    "1",
    <ControlOutlined />
  ),
  getItem(
    <Link to={"/administrator/users"} className="noneLink">
      User Management
    </Link>,
    "2",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/administrator/news"} className="noneLink">
      News
    </Link>,
    "3",
    <CoffeeOutlined />
  ),
  getItem(
    <Link to={"/administrator/feedbacks"} className="noneLink">
      Feedbacks
    </Link>,
    "4",
    <FileDoneOutlined />
  ),
  getItem(
    <Link to={"/administrator/form-online"} className="noneLink">
      Form Online
    </Link>,
    "5",
    <EditOutlined />
  ),
  getItem(
    <span style={{ fontSize: 11, padding: "auto" }}>Services Management</span>,
    "6",
    <CheckCircleOutlined />,
    [
      getItem(
        <Link to={"/administrator/services/booking"} className="noneLink">
          List Booking Services
        </Link>,
        "8",
        <TableOutlined />
      ),
      getItem(
        <Link to={"/administrator/services/system"} className="noneLink">
          System Service
        </Link>,
        "9",
        <CiCircleFilled />
      ),
    ]
  ),
  getItem(
    <Link to={"/administrator/config"} className="noneLink">
      Configuration
    </Link>,
    "7",
    <SettingOutlined />
  ),
];

const logo = [
  getItem(
    <Link to={"resident/facilitybooking"} className="noneLink">
      <h1
        style={{
          fontSize: 16,
          color: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Estella Heights
      </h1>
    </Link>,
    "10",
    <img
      src="data:image/png;base64,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"
      alt="logo"
      style={{
        height: 31,
        width: 31,
      }}
      align="left"
    ></img>
  ),
];
const HeaderLayout = ({ children }, props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalButton, setIsModalButton] = useState(false);
  const { i18n } = useTranslation();
  const { t } = props;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalButton = () => {
    setIsModalButton(true);
  };

  const handleCancelButton = () => {
    setIsModalButton(false);
  };
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");

  const logOut = () => {
    delCookie();
    navigate("/login");
  };
  const changePass = () => {
    navigate("resident/changepassword");
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Layout>
      {/* layout left */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <Menu theme="light" mode="inline" items={logo} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            paddingRight: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="userContainer1">
            <div onClick={showModal} className="user1">
              <span>
                <Avatar
                  icon={<UserOutlined />}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </span>
              <span> {getUser}</span>
            </div>
            <div onClick={showModalButton} className="translate">
              <GlobalOutlined style={{ fontSize: "18px" }} />
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: 0,
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        {/* Modal translate */}
        <Modal
          visible={isModalButton}
          footer={null}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
          maskClosable={true}
          onCancel={handleCancelButton}
          width="200px"
          bodyStyle={{ padding: 0 }}
          style={{
            top: "64px",
            margin: "0 0 0 auto",
            paddingRight: "10px",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <div className="div">
              <Button onClick={() => changeLanguage("en")}>en Tiếng anh</Button>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="div">
              <Button onClick={() => changeLanguage("vi")}>
                vi Tiếng Việt
              </Button>
            </div>
          </div>
        </Modal>

        {/* User Modal */}
        <Modal
          visible={isModalVisible}
          footer={null}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
          maskClosable={true}
          onCancel={handleCancel}
          width="200px"
          bodyStyle={{ padding: "12px" }}
          style={{ top: "64px", margin: "0 0 0 auto", paddingRight: "10px" }}
        >
          <div>
            <Button
              block
              icon={<PoweroffOutlined />}
              style={{
                borderColor: "transparent",
                boxShadow: "unset",
                textAlign: "left",
              }}
              onClick={() => logOut()}
            >
              Đăng xuất
            </Button>
            <Button
              block
              icon={<SettingOutlined />}
              style={{
                borderColor: "transparent",
                marginTop: "10px",
                boxShadow: "unset",
                textAlign: "left",
              }}
              onClick={() => changePass()}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default HeaderLayout;
