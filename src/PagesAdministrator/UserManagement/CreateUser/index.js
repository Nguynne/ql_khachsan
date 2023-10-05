import React, { useEffect } from "react";
import {
  notification,
  Button,
  Form,
  Input,
  Select,
  Breadcrumb,
  Radio,
} from "antd";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  selectDataRole,
  selectDataRoom,
  selectDataUser,
} from "./stores/selectors";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";

import {
  getAllUserRequestAction,
  getRoleAction,
  getRoomAction,
  asyncCreateUserAction,
} from "./stores/actions";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const CreateUser1 = (props) => {
  const { t } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { dataRoom, dataRole } = props;
  const {
    getAllUserRequestDispatch,
    asyncCreateUserDispatch,
    getRoleDispatch,
    getRoomDispatch,
  } = props;
  useEffect(() => {
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
    const payloadRoom = {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "name",
        order: "desc",
      },
    };
    const payloadRole = {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "name",
        order: "asc",
      },
    };
    getAllUserRequestDispatch(payload);
    getRoomDispatch(payloadRoom);
    getRoleDispatch(payloadRole);
  }, []);
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const res = await asyncCreateUserDispatch(values);

    if (res.status === 200) {
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

      getAllUserRequestDispatch(payload);
      notification.open({
        message: "Create user",
        description: "Create user thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      navigate("/administrator/users");
    } else {
      notification.open({
        message: "Create user",
        description: "Create user Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  const prefixSelector = (
    <Form>
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+84</Option>
        </Select>
      </Form.Item>
    </Form>
  );
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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
            <Breadcrumb.Item>{t("User")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("CreateUser")}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{t("UsersManagement")}</h4>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <h6 className="p-1">{t("UserProfile")}</h6>
          <hr></hr>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label={t("Username")}
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="fullName"
              label={t("FullName")}
              rules={[
                {
                  required: true,
                  message: "Please input your fullName",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please input email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label={t("PhoneNumber")}
              rules={[
                {
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item name="address" label={t("Address")}>
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label={t("Gender")}
              rules={[
                {
                  message: "Please select gender!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="MALE">{t("Male")}</Radio>
                <Radio value="FEMALE"> {t("Female")} </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="roomId" label={t("Room")}>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
              >
                {dataRoom.map((item) => (
                  <Option value={item.name} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="roleId" label={t("Role")}>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
              >
                {dataRole.map((item) => (
                  <Option value={item.name} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  dataUser: selectDataUser,
  dataRole: selectDataRole,
  dataRoom: selectDataRoom,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequestDispatch: (payload) =>
    dispatch(getAllUserRequestAction(payload)),
  asyncCreateUserDispatch: (payload) =>
    asyncCreateUserAction(dispatch)(payload),
  getRoleDispatch: (payload) => dispatch(getRoleAction(payload)),
  getRoomDispatch: (payload) => dispatch(getRoomAction(payload)),
});

const CreateUser = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateUser1)
);
export default CreateUser;
