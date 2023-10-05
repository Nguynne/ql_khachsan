import "./style.css";
import { Tabs } from "antd";
import React from "react";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import CreateFeedback from "./Feedbacks";
import History from "./History";

function CreateFeedback1(props) {
  const { t } = props;

  return (
    <div className="color3 m-0 p-3">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t("Feedbacks")} key="1">
          <div>
            <CreateFeedback />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("History")} key="2">
          <div>
            <History />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});

const FeedbackResident = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateFeedback1)
);
export default FeedbackResident;
