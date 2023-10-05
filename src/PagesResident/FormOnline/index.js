import { Tabs } from "antd";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import CreateForm from "./EquipmentGoodsMoving";
import CreateForM from "./WorkPermit";
import History from "./History";

function CreateFRom(props) {
  const { t } = props;

  return (
    <div className="color3 m-0 p-3">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t("EquipmentGoodsMoving")} key="1">
          <div>
            <CreateForm />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("WorkPermit")} key="2">
          <div>
            <CreateForM />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("History")} key="3">
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

const FromsResident = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateFRom)
);
export default FromsResident;
