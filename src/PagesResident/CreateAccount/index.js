import "./style.css";
import { Tabs } from "antd";
import React from "react";
// import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import CreateAccount from "./CreateAccount";
import ListAccount from "./ListAccount";

function CreateACC(props) {
  const { t } = props;

  return (
    <div className="color3 m-0 p-3">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t("Tạo tài khoản")} key="1">
          <div>
            <CreateAccount />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("ListAccount")} key="2">
          <div>
            <ListAccount />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});

const ACCResident = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateACC)
);
export default ACCResident;
