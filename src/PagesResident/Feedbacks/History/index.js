import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input } from "antd";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataUser } from "./stores/selectors";
import { getFeedbacksAction } from "./stores/actions";

const History = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, dataUser } = props;
  const { getAllUserRequest } = props;

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

    getAllUserRequest(payload);
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        const pageNum = dataUser.paging?.pageIndex;
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
      title: "Reply",
      dataIndex: "reply",
      key: "reply",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, id) => {
        return <p>{record.status}</p>;
      },
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
        field: "username",
        order: "asc",
      },
    };
    getAllUserRequest(payload);
  };

  const onChangeTable = (paging) => {
    const payload = {
      search: "",
      paging: {
        pageIndex: paging?.current || 1,
        pageSize: 10,
      },
      sorting: {
        field: "username",
        order: "asc",
      },
    };
    getAllUserRequest(payload);
  };
  return (
    <>
      <div className="student color3">
        <div className="d-flex justify-content-between">
          <div className="search">
            <Form>
              <Form.Item name="search" label="Search">
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Seach by title"
                />
              </Form.Item>
              <Button type="primary" onClick={() => searchTable(searchValue)}>
                Tìm kiếm
              </Button>
            </Form>
          </div>
        </div>
        <br></br>
        <Table
          rowKey="id"
          locale={{ emptyText: "No data" }}
          columns={columns}
          dataSource={dataUser.data}
          loading={isLoading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageIndex: dataUser.paging?.pageIndex,
            pageSize: dataUser.paging?.pageSize,
            total: dataUser.paging?.total,
          }}
          onChange={onChangeTable}
        />
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataUser: selectDataUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => dispatch(getFeedbacksAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(History);
