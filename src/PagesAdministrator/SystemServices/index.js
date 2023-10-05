import "./index.css";
import { Input, Row, Col, Button, Table, Tag, Popconfirm, Spin } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  asyncDeleteSystemServicesAction,
  asyncGetAllSystemServicesAction,
} from "./stores/action";
import { createStructuredSelector } from "reselect";
import { useEffect, useState } from "react";
import { selectSystemServices } from "./stores/selector";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

//object destructuring. '={}' to allow function to be call without params requestPayload()
function requestPayload({ pageIndex = 1, pageSize = 10, search = "", sortField = "", sortOrder = "desc" } = {}) {
  const payload = {
    search: search,
    paging: {
      pageIndex: pageIndex,
      pageSize: pageSize,
    },
    sorting: {
      field: sortField,
      order: sortOrder,
    },
  };
  return payload;
}

function SystemServicesPageComponent(props) {
  const { getAllSystemServicesDispatch, deleteSystemServicesDispatch } = props;
  const { listSystemServices } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { t } = props;
  const [request, setRequest] = useState(
    {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "",
        order: "desc",
      },
    }
  )
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getAllSystemServicesDispatch(request);
      setIsLoading(false);
    };
    loadData();
  }, [request]);

  const deleteSystemServices = async (id) => {
    const resolve = await deleteSystemServicesDispatch(id);
    if (resolve.status === 200) {
      if (listSystemServices.data.length > 1) {
        setRequest(requestPayload({
          pageIndex: request.paging.pageIndex,
          sortField: request.sorting.field,
          sortOrder: request.sorting.order,
        }))
      } else if (listSystemServices.data.length === 1) {
        setRequest(requestPayload({
          pageIndex: request.paging.pageIndex > 1 ? (request.paging.pageIndex - 1) : 1,
          sortField: request.sorting.field,
          sortOrder: request.sorting.order,
        }))
      }
    }
  };

  const tablePagination = () => {
    const pageIndex = listSystemServices.paging?.pageIndex;
    const pageSize = listSystemServices.paging?.pageSize;
    const total = listSystemServices.paging?.total;
    const defaultPageSize = 10;
    const current = listSystemServices.paging?.pageIndex;

    return { defaultPageSize, pageIndex, pageSize, total, current };
  };
  const onChangeTable = async (paging, filters, sorter, extra) => {
    if (paging) {
      setRequest(requestPayload({
        pageIndex: paging?.current,
        sortOrder: sorter.order === "ascend" ? "asc" : "desc",
        sortField: sorter.column?.dataIndex
      }))
    } else {
      setRequest(requestPayload({
        sortOrder: sorter.order === "ascend" ? "asc" : "desc",
        sortField: sorter.column?.dataIndex
      }))
    }
  };
  //Search box
  const { Search } = Input;
  const onSearch = async (value) => {
    setRequest(requestPayload({ search: value }));
  };

  //Table section
  const columns = [
    {
      title: "ID",
      key: "displayId",
      render: (_, record, index) => {
        return (request.paging.pageIndex - 1) * request.paging.pageSize + 1 + index
      }
    },
    {
      title: t("ServiceName"),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/administrator/services/system/edit/${record.id}`}
          className="news-link"
        >
          {text}
        </Link>
      ),
      sorter: true,
    },
    {
      title: t("ServicesType"),
      dataIndex: "type",
      key: "type",
      render: (text) => <Tag color="orange"> {text} </Tag>,
      sorter: true,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color="blue"> {text} </Tag>,
      sorter: true,
    },
    {
      title: t("Action"),
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteSystemServices(record.id)}
        >
          <Button type="link">{t("Delete")}</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Spin className="news-container" spinning={isLoading}>
      <p className="news-breadcrumb">
        {t("Home")} / {t("ServicesTitle")} / <span className="current-breadcrumb">{t("ListServices")}</span>
      </p>
      <h1 className="news-title">{t("ListServicesTitle")}</h1>
      <Row>
        <Col span={8}>
          <Search
            placeholder={t("BookingPlaceholder")}
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={4} offset={12} style={{ textAlign: "right" }}>
          <Link to="/administrator/services/system/create">
            <Button type="primary">
              <PaperClipOutlined />
              {t("CreateServices")}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={listSystemServices.data}
        pagination={tablePagination()}
        onChange={onChangeTable}
        className="news-table"
        rowKey="id"
      />
    </Spin>
  );
}

const mapStateToProps = createStructuredSelector({
  listSystemServices: selectSystemServices,
});

const mapDispatchToProps = (dispatch) => ({
  getAllSystemServicesDispatch: (payload) =>
    asyncGetAllSystemServicesAction(dispatch)(payload),
  deleteSystemServicesDispatch: (payload) =>
    asyncDeleteSystemServicesAction(dispatch)(payload),
});

const SystemServicesPage = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SystemServicesPageComponent)
)
export default SystemServicesPage;
