import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Menu } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataForm } from "./stores/selector";
import { getFormAction } from "./stores/action";

const History = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, dataForm } = props;
  const { getAllFormRequest } = props;

  useEffect(() => {
    const payload = {
      search: "",
      startAt: null,
      endAt: null,
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "createdAt",
        order: "desc",
      },
    };

    getAllFormRequest(payload);
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        const pageNum = dataForm.paging?.pageIndex;
        return (pageNum - 1) * 10 + index;
      },
      showSorterTooltip: false,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        return <Button type="link">{record.title}</Button>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, id) => {
        return <p>{record.status}</p>;
      },
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "startAt",
      key: "startAt",
    },
  ];

  const searchTable = (searchValue) => {
    const payload = {
      search: searchValue,
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "Formname",
        order: "asc",
      },
    };
    getAllFormRequest(payload);
  };

  const onChangeTable = (paging) => {
    const payload = {
      search: "",
      paging: {
        pageIndex: paging?.current || 1,
        pageSize: 10,
      },
      sorting: {
        field: "Formname",
        order: "asc",
      },
    };
    getAllFormRequest(payload);
  };
  return (
    <>
      <div className="student">
        <div className="d-flex justify-content-between">
          <div className="search">
            <Form.Item name="search" label="Search">
              <Input
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Seach by title"
              />
            </Form.Item>
            <Button type="primary" onClick={() => searchTable(searchValue)}>
              Tìm kiếm
            </Button>
          </div>
        </div>
        <br></br>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataForm.data}
          loading={isLoading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageIndex: dataForm.paging?.pageIndex,
            pageSize: dataForm.paging?.pageSize,
            total: dataForm.paging?.total,
          }}
          onChange={onChangeTable}
        />
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataForm: selectDataForm,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFormRequest: (payload) => dispatch(getFormAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(History);
