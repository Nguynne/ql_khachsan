import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  Breadcrumb,
  notification,
  DatePicker,
  Tag,
} from "antd";
import { DownOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectLoading,
  selectDataUser,
  selectDetail,
} from "./stores/selectors";
import {
  getFeedbacksAction,
  asyncDeleteFeedbacksAction,
  asyncReplyFeedbacksAction,
  asyncGetDetailFeedbacksAction,
} from "./stores/actions";
import { withTranslation } from "react-i18next";
const { RangePicker } = DatePicker;
const Feedbacks1 = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [idFeed, setIdFeed] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const { isLoading, dataUser, dataDetail } = props;
  const {
    getAllUserRequest,
    deleteUserDispatch,
    replyFeedbacksDispatch,
    getDetailDispatch,
  } = props;
  const { t } = props;
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
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => openModalDetailUser(record.id)}>
            {record.title}
          </Button>
        );
      },
      sorter: true,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record, id) => {
        if (text === "WAITINGFORREPLY") {
          return (
            <Tag color="red" key={id}>
              {record.status}
            </Tag>
          );
        } else {
          return (
            <Tag color="green" key={id}>
              {record.status}
            </Tag>
          );
        }
      },
      sorter: true,
    },

    {
      title: t("CreatedBy"),
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: true,
    },

    {
      title: t("CreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
    },
    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a href="/">{t("Delete")}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    const res = await deleteUserDispatch(id);
    if (res === 200) {
      const payload = {
        search: "",
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
      notification.open({
        message: "Delete User",
        description: "Delete User thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: "Delete User",
        description: "Delete User Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  // hgvbhjkgbvhjkvbhjkbvhjkbhjkb
  const openModalDetailUser = async (id) => {
    const res = await getDetailDispatch(id);

    if (res) {
      form.setFieldsValue({
        reply: res.reply,
      });
    }

    setIdFeed(id);
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  //

  const onSubmit = async (values) => {
    // sua

    const response = await replyFeedbacksDispatch(idFeed, values);
    if (response.status === 200) {
      notification.open({
        message: "Reply Feedbacks",
        description: "Reply Feedbacks thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      setVisible(false);
    } else {
      notification.open({
        message: "Reply Feedbacks",
        description: "Reply Feedbacks Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
      setVisible(false);
    }
  };
  //
  const searchTable = (searchValue) => {
    const payload = {
      search: searchValue,
      startAt: dateStart,
      endAt: dateEnd,
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
  function onChange(date, dateString) {
    setDateStart(dateString[0]);
    setDateEnd(dateString[1]);
  }
  return (
    <>
      <div className="student">
        <div>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{t("Home")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("Feedbacks")}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{t("Feedbacks")}</h4>
        </div>

        <div className="d-flex justify-content-between">
          <div className="search">
            <Form>
              <Form.Item name="search">
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("Search")}
                />
              </Form.Item>
            </Form>

            <Button type="primary" onClick={() => searchTable(searchValue)}>
              <SearchOutlined />
            </Button>
          </div>
          <div>
            <Space>
              <RangePicker onChange={onChange} />
            </Space>
          </div>
        </div>
        <br></br>
        <Table
          rowKey="id"
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
        <Modal
          title={dataDetail.title}
          visible={visible}
          onCancel={() => handleCancel()}
          footer={
            <Space>
              <Button onClick={() => handleCancel()}>Đóng</Button>
              <Button type="primary" htmlType="submit" form="form">
                Gửi đi
              </Button>
            </Space>
          }
        >
          <div>
            <img
              style={{ display: "block", width: 400, height: 220 }}
              src={`data:image/jpg;base64,${dataDetail.imageUrl}`}
              alt="img"
            />
            <p>{dataDetail.content}</p>
          </div>
          <Form
            form={form}
            name="form"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              reply: dataDetail.reply,
            }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="" name="reply">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataUser: selectDataUser,
  dataDetail: selectDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => dispatch(getFeedbacksAction(payload)),
  deleteUserDispatch: (payload) =>
    asyncDeleteFeedbacksAction(dispatch)(payload),
  getDetailDispatch: (payload) =>
    asyncGetDetailFeedbacksAction(dispatch)(payload),
  replyFeedbacksDispatch: (id, payload) =>
    asyncReplyFeedbacksAction(dispatch)(id, payload),
});

const Feedbacks = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Feedbacks1)
);
export default Feedbacks;
