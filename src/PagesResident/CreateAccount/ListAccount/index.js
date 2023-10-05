import React, { useEffect } from "react";
import { Table, Button } from "antd";

import "./index.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataACC } from "./stores/selector";
import { getAccountAction } from "./stores/action";

const ListAccount = (props) => {
  const { isLoading, dataACC } = props;
  const { getAllACCRequest } = props;

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

    getAllACCRequest(payload);
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        const pageNum = dataACC.paging?.pageIndex;
        return (pageNum - 1) * 10 + index;
      },
      showSorterTooltip: false,
    },

    {
      title: "username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        return <Button type="link">{record.title}</Button>;
      },
    },
    {
      title: "fullName",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record, id) => {
        return <p>{record.status}</p>;
      },
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "startAt",
      key: "startAt",
    },
  ];

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
    getAllACCRequest(payload);
  };
  return (
    <>
      <div className="student">
        <div className="d-flex justify-content-between"></div>
        <br></br>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataACC.data}
          loading={isLoading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageIndex: dataACC.paging?.pageIndex,
            pageSize: dataACC.paging?.pageSize,
            total: dataACC.paging?.total,
          }}
          onChange={onChangeTable}
        />
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataACC: selectDataACC,
});

const mapDispatchToProps = (dispatch) => ({
  getAllACCRequest: (payload) => dispatch(getAccountAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ListAccount);
