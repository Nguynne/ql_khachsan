import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  Menu,
  Breadcrumb,
  Dropdown,
  notification,
  Upload,
  Tabs,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  HighlightOutlined,
  CloseOutlined,
  DownCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectLoading,
  selectUserProfile,
  selectDataUser,
} from "./stores/selectors";
import {
  getAllUserRequestAction,
  asyncDeleteUserAction,
  getAllProfileAction,
  asyncChangeStatusAction,
  asyncResetPWAction,
  asyncDetailUpdateStudentAction,
  setLoading,
} from "./stores/actions";
import { withTranslation } from "react-i18next";

const All1 = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, dataUser, dataUserProfile } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    getAllUserRequest,
    deleteUserDispatch,
    getAllUserProfileDispatch,
    changeStatusDispatch,
    resetPWDispatch,
    updateDeptAmountDispatch,
  } = props;
  const { t } = props;
  const [pagingData, setPagingData] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "username",
      order: "asc",
    },
    url: "All",
  });
  useEffect(() => {
    getAllUserRequest(pagingData);
  }, [getAllUserRequest, pagingData]);
  const columns = [
    {
      title: "id",
      key: "username",
      render: (id, record, index) => {
        ++index;
        const pageNum = dataUser.paging?.pageIndex;
        return (pageNum - 1) * 10 + index;
      },
    },

    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        return (
          <Button
            type="link"
            onClick={() => openModalDetailUser(record.username)}
          >
            {record.username}
          </Button>
        );
      },
      sorter: true,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        if (text === "Activated") {
          return <DownCircleOutlined style={{ color: "green" }} />;
        } else {
          return <DownCircleOutlined style={{ color: "red" }} />;
        }
      },
      sorter: true,
    },

    {
      title: t("FullName"),
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
    },

    {
      title: t("DebtAmount"),
      dataIndex: "debtAmount",
      key: "debtAmount",
      sorter: true,
    },
    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.username)}
          >
            <a href="/">{t("Delete")}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: (
            <Button style={{ width: 160 }}>
              <a
                style={{ color: "black", textDecoration: "none" }}
                href="/administrator/users/createuser"
              >
                {t("CreateNewUser")}
              </a>
            </Button>
          ),
          key: "1",
        },
        {
          label: (
            <Button
              style={{ width: 160 }}
              onClick={() => editUpdateDeptAmount()}
            >
              <p>{t("UpdateDeptAmount")}</p>
            </Button>
          ),
          key: "2",
        },
      ]}
    />
  );
  const editUpdateDeptAmount = (id) => {
    setModalVisible(true);
  };
  const openModalDetailUser = async (user) => {
    const payload = {
      username: user,
    };
    await getAllUserProfileDispatch(payload);
    setVisible(true);
  };
  const handleDelete = async (id) => {
    const res = await deleteUserDispatch(id);
    if (res === 200) {
      const del = {
        ...pagingData,
        search: "",
      };
      setPagingData(del);
      notification.open({
        message: t("mDelete"),
        description: t("dDelete"),
        icon: <DownOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: t("mDelete"),
        description: t("dDelete1"),
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setModalVisible(false);
  };
  const searchTable = (searchValue) => {
    const searchTable = {
      ...pagingData,

      search: searchValue,
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
    setPagingData(searchTable);
  };
  const resetPass = async (user) => {
    const res = await resetPWDispatch(user);
    if (res === 200) {
      getAllUserRequest(pagingData);
      notification.open({
        message: t("mResetPW"),
        description: t("dResetPW"),
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      setPagingData(pagingData);
    } else {
      notification.open({
        message: t("mResetPW"),
        description: t("dResetPW1"),
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  const changeStatus1 = async (user) => {
    const res = await changeStatusDispatch(user);
    if (res === 200) {
      getAllUserRequest(pagingData);
      notification.open({
        message: t("mStatus"),
        description: t("dStatus"),
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      setPagingData(pagingData);
    } else {
      notification.open({
        message: t("mStatus"),
        description: t("dStatus1"),
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };

  const onSubmit = async () => {
    let request = new FormData();
    request.append("file", fileList);
    const res = await updateDeptAmountDispatch(request);
    if (res.status === 200) {
      getAllUserRequest(pagingData);
      notification.open({
        message: t("mDeptAmount"),
        description: t("dDeptAmount"),
        icon: <DownOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: t("mDeptAmount"),
        description: t("dDeptAmount1"),
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
    setModalVisible(false);
  };
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  const onChangeTable = (page) => {
    const newPaging = {
      ...pagingData,
      paging: {
        pageIndex: page.current,
        pageSize: 10,
      },
    };
    setPagingData(newPaging);
  };
  const onchangeTab = (key) => {
    const newPaging = {
      ...pagingData,
      url: key,
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
    setPagingData(newPaging);
  };
  return (
    <>
      <div className="student" key={0}>
        <div key={1}>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{t("Home")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("Users")}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{t("UsersManagement")}</h4>
        </div>
        <div className="d-flex justify-content-between" key={2}>
          <div className="search" key={3}>
            <Form>
              <Form.Item name="search">
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("Search1")}
                />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={() => searchTable(searchValue)}>
              <SearchOutlined />
            </Button>
          </div>
          <div key={4}>
            <Dropdown overlay={menu} key={menu.key}>
              <Button>
                <Space>
                  {t("Action")}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={onchangeTab}>
          <Tabs.TabPane tab={t("All")} key="All"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Residence")} key="Resident"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Tenant")} key="Tenant"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Admin")} key="Admin"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Reception")} key="Reception"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Accountant")} key="Accountant"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Security")} key="Security"></Tabs.TabPane>
          <Tabs.TabPane tab={t("Guest")} key="Guest"></Tabs.TabPane>
        </Tabs>

        <br></br>
        <Table
          rowKey="username"
          key="username"
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
          bodyStyle={{ height: 1000 }}
          style={{
            marginRight: 0,
            top: 0,
            bottom: 0,
            right: 0,
            position: "fixed",
          }}
          visible={visible}
          onCancel={handleCancel}
          maskClosable={true}
          footer={null}
          closable={false}
        >
          <h6>User Profile</h6>
          <Button style={{ marginRight: 10 }}>
            <NavLink
              to={`/administrator/users/edit/${dataUserProfile.username}`}
            >
              <EditOutlined />
              Edit
            </NavLink>
            ;
          </Button>
          <Space size="middle">
            <Popconfirm
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              title="Sure to Reset password?"
              onConfirm={() => resetPass(dataUserProfile.username)}
            >
              <Button style={{ marginRight: 10 }}>
                <HighlightOutlined />
                Reset Password
              </Button>
            </Popconfirm>
          </Space>
          <Space size="middle">
            <Popconfirm
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              title="Sure to change status?"
              onConfirm={() => changeStatus1(dataUserProfile.username)}
            >
              <Button style={{ marginRight: 10 }}>
                <ExclamationCircleOutlined />
                Deactivated/Activated
              </Button>
            </Popconfirm>
          </Space>

          <br></br>
          <h6>Personal</h6>
          <br></br>
          <div className="container" key={5}>
            <div className="row" key={6}>
              <div className="col-6" key={7}>
                <div key={8}>
                  <span>Full Name: </span>
                  <span>{dataUserProfile.fullName}</span>
                </div>
                <div key={9}>
                  <span>Gender: </span>
                  <span>{dataUserProfile.gender}</span>
                </div>
                <div key={10}>
                  <span>Role: </span>
                  <span>{dataUserProfile.role}</span>
                </div>
              </div>

              <div className="col-6" key={11}>
                <div key={17}>
                  <span>Account: </span>
                  <span>{dataUserProfile.username}</span>
                </div>
                <div key={12}>
                  <span>Room: </span>
                  <span>{dataUserProfile.room}</span>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <h6>Contacts</h6>
          <br></br>
          <div key={13}>
            <span>Address: </span>
            <span>{dataUserProfile.username}</span>
          </div>
          <div key={14}>
            <span>Email: </span>
            <span> {dataUserProfile.room}</span>
          </div>
          <div key={15}>
            <span>Phone: </span>
            <span>{dataUserProfile.room}</span>
          </div>
        </Modal>
        <Modal
          title="Import Cost File"
          visible={isModalVisible}
          onCancel={() => handleCancel()}
          footer={
            <Space>
              <Button type="primary" htmlType="submit" form="form">
                Submit
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            name="form"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
          >
            <Form.Item
              label="File"
              name="file"
              rules={[
                {
                  required: true,
                  message: "Please input upload",
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
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
  dataUserProfile: selectUserProfile,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => dispatch(getAllUserRequestAction(payload)),
  setLoadingDispatch: (payload) => dispatch(setLoading(payload)),
  getAllUserProfileDispatch: (payload) =>
    dispatch(getAllProfileAction(payload)),
  deleteUserDispatch: (payload) => asyncDeleteUserAction(dispatch)(payload),
  resetPWDispatch: (payload) => asyncResetPWAction(dispatch)(payload),
  changeStatusDispatch: (payload) => asyncChangeStatusAction(dispatch)(payload),
  updateDeptAmountDispatch: (payload) =>
    asyncDetailUpdateStudentAction(dispatch)(payload),
});

const All = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(All1)
);
export default All;
