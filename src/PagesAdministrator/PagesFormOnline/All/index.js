import "./index.css";
import { DatePicker, Tabs } from "antd";
import { Input, Row, Col, Button, Table } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { compose } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useEffect } from "react";
import { selectFormsData } from "./stores/selector";
import { Link } from "react-router-dom";
import { asyncDeleteFormAction, getAllFormsAction } from "./stores/action";
import { selectForms } from "./stores/selector";
import { all } from "redux-saga/effects";
import { useState } from "react";

function FormsPage(props) {
  const { getAllFormsDispatch, deleteFormsDispatch } = props;
  const { listForms } = props;
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const { RangePicker } = DatePicker;
  const [pagingSearch, setPaging] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
    url: "All",
  });
  useEffect(() => {
    getAllFormsDispatch(pagingSearch);
  }, [pagingSearch]);

  const deleteForms = async (id) => {
    const resolve = await deleteFormsDispatch(id);
    if (resolve.status === 200) {
      getAllFormsDispatch(pagingSearch);
    }
  };

  const onChangeTable = (page) => {
    const newPaging = {
      ...pagingSearch,
      paging: {
        pageIndex: page.current,
        pageSize: 10,
      },
    };
    setPaging(newPaging);
  };
  //Search box
  const { Search } = Input;
  const onSearch = (value) => {
    const newPaging = {
      ...pagingSearch,
      search: value,
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      startAt: dateStart,
      endAt: dateEnd,
    };
    setPaging(newPaging);
  };

  //Table section
  const columns = [
    {
      title: "ID",
      key: "displayId",
      render: (text, record, index) =>
        (pagingSearch.paging.pageIndex - 1) * pagingSearch.paging.pageSize +
        index +
        1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/administrator/Forms/edit/${record.id}`}
          className="Forms-link"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Form Type",
      dataIndex: "formtype",
      key: "formtype",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Create by",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Date created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => deleteForms(record.id)}>
          Delete
        </Button>
      ),
    },
  ];
  const { TabPane } = Tabs;
  const onChangeTab = (key) => {
    console.log(key);
    const newpaging = {
      ...pagingSearch,
      url: key,
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
    setPaging(newpaging);
  };
  function onChangeDate(date, dateString) {
    setDateStart(dateString[0]);
    setDateEnd(dateString[1]);
  }
  console.log("listform");
  console.log(listForms);
  return (
    <div className="Forms-container">
      <p className="Forms-breadcrumb">
        Home / <span className="current-breadcrumb">Forms</span>
      </p>
      <h1 className="Forms-title">Quản Lý Biểu Mẫu Trực Tuyến</h1>
      <Row>
        <Col span={8}>
          <Search
            placeholder="Search by title or tag"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col>
          <div>
            <RangePicker onChange={onChangeDate} />
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" onChange={onChangeTab}>
        <TabPane tab="All" key="All" />
        <TabPane tab="Cấp phép làm việc" key="Fixing" />
        <TabPane tab="Di chuyển vào" key="MoveIn" />
        <TabPane tab="Di chuyển ra" key="MoveOut" />
        <TabPane tab="Yêu cầu" key="WorkOrder" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={listForms.data}
        onChange={onChangeTable}
        className="Forms-table"
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  listForms: selectFormsData,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFormsDispatch: (payload) => dispatch(getAllFormsAction(payload)),
  deleteFormsDispatch: (payload) => asyncDeleteFormAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FormsPage);
