import "./index.css";
import { Input, Row, Col, Button, Table, Popconfirm, Spin } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { compose } from "recompose";
import { connect } from "react-redux";
import { asyncDeleteNewsAction, asyncGetAllNewsAction } from "./stores/action";
import { createStructuredSelector } from "reselect";
import { useEffect, useState } from "react";
import { selectNews } from "./stores/selector";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

//object destructuring. '={}' to allow function to be call without params requestPayload()
function requestPayload({
  pageIndex = 1,
  pageSize = 10,
  search = "",
  sortField = "createdAt",
  sortOrder = "desc",
} = {}) {
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

function NewsPageComponent(props) {
  const { getAllNewsDispatch, deleteNewsDispatch } = props;
  const { listNews } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { t } = props;
  const [request, setRequest] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getAllNewsDispatch(request);
      setIsLoading(false);
    };
    loadData();
  }, [request]);

  const deleteNews = async (id) => {
    const resolve = await deleteNewsDispatch(id);
    if (resolve.status === 200) {
      if (listNews.data.length > 1) {
        setRequest(
          requestPayload({
            pageIndex: request.paging.pageIndex,
            sortField: request.sorting.field,
            sortOrder: request.sorting.order,
          })
        );
      } else if (listNews.data.length === 1) {
        setRequest(
          requestPayload({
            pageIndex:
              request.paging.pageIndex > 1 ? request.paging.pageIndex - 1 : 1,
            sortField: request.sorting.field,
            sortOrder: request.sorting.order,
          })
        );
      }
    }
  };

  const tablePagination = () => {
    const pageIndex = listNews.paging?.pageIndex;
    const pageSize = listNews.paging?.pageSize;
    const total = listNews.paging?.total;
    const defaultPageSize = 10;
    const current = listNews.paging?.pageIndex;

    return { defaultPageSize, pageIndex, pageSize, total, current };
  };

  const onChangeTable = async (paging, filters, sorter, extra) => {
    if (paging) {
      setRequest(
        requestPayload({
          pageIndex: paging?.current,
          sortOrder: sorter.order === "ascend" ? "asc" : "desc",
          sortField: sorter.column?.dataIndex,
        })
      );
    } else {
      setRequest(
        requestPayload({
          sortOrder: sorter.order === "ascend" ? "asc" : "desc",
          sortField: sorter.column?.dataIndex,
        })
      );
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
        return (
          (request.paging.pageIndex - 1) * request.paging.pageSize + 1 + index
        );
      },
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/administrator/news/edit/${record.id}`}
          className="news-link"
        >
          {text}
        </Link>
      ),
      sorter: true,
    },
    {
      title: t("Tag"),
      dataIndex: "tag",
      key: "tag",
      sorter: true,
    },
    {
      title: t("CreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
    },
    {
      title: t("CreatedBy"),
      dataIndex: "createdBy",
      key: "createdBy",
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
          onConfirm={() => deleteNews(record.id)}
        >
          <Button type="link">{t("Delete")}</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Spin className="news-container" spinning={isLoading}>
      <p className="news-breadcrumb">
        {t("Home")} / <span className="current-breadcrumb">{t("adNews")}</span>
      </p>
      <h1 className="news-title">{t("NewsTitle")}</h1>
      <Row>
        <Col span={8}>
          <Search
            placeholder={t("NewsPlaceholder")}
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={4} offset={12} style={{ textAlign: "right" }}>
          <Link to="/administrator/news/create">
            <Button type="primary">
              <PaperClipOutlined />
              {t("CreateNews")}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={listNews?.data}
        pagination={tablePagination()}
        onChange={onChangeTable}
        className="news-table"
        rowKey="id"
      />
    </Spin>
  );
}

const mapStateToProps = createStructuredSelector({
  listNews: selectNews,
});

const mapDispatchToProps = (dispatch) => ({
  getAllNewsDispatch: (payload) => asyncGetAllNewsAction(dispatch)(payload),
  deleteNewsDispatch: (payload) => asyncDeleteNewsAction(dispatch)(payload),
});

const NewsPage = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NewsPageComponent)
);
export default NewsPage;
