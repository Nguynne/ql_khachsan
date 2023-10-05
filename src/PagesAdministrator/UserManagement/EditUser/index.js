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
import {
  asyncgetAllProfileAction,
  getRoleAction,
  getRoomAction,
  asyncEditUserAction,
} from "./stores/actions";
import { useNavigate } from "react-router-dom";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
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
const EditUser1 = (props) => {
  let { id } = useParams();
  const { t } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { dataRoom, dataRole } = props;
  const {
    getAllUserRequestDispatch,
    asyncEditUserDispatch,
    getRoleDispatch,
    getRoomDispatch,
  } = props;
  useEffect(() => {
    const onEdit = async (id) => {
      const res = await getAllUserRequestDispatch(id);
      if (res) {
        form.setFieldsValue({
          address: res.address,
          email: res.email,
          fullName: res.fullName,
          gender: res.gender,
          phoneNumber: res.phoneNumber,
          roleId: res.role,
          roomId: res.room,
          username: res.username,
        });
      }
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
    const payload = {
      username: id,
    };
    onEdit(payload);
    getRoomDispatch(payloadRoom);
    getRoleDispatch(payloadRole);
  }, []);

  const onFinish = async (values) => {
    const res = await asyncEditUserDispatch(values);
    if (res.status === 201 || res.status === 200) {
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
        message: "Edit user",
        description: "Edit user thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      navigate("/administrator/users");
    } else {
      notification.open({
        message: "Edit user",
        description: "Edit user Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };

  const prefixSelector = (
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
            <Breadcrumb.Item>{t("EditUser")}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{t("UsersManagement")}</h4>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <h6 className="p-1">{t("UserProfile")}</h6>
          <hr></hr>

          <Form
            {...formItemLayout}
            form={form}
            name="form"
            onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item name="username" label={t("Username")} disabled>
              <Input disabled />
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
                  <Option value={item.id} key={item.id}>
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
    asyncgetAllProfileAction(dispatch)(payload),
  asyncEditUserDispatch: (payload) => asyncEditUserAction(dispatch)(payload),
  getRoleDispatch: (payload) => dispatch(getRoleAction(payload)),
  getRoomDispatch: (payload) => dispatch(getRoomAction(payload)),
});

const EditUser = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(EditUser1)
);
export default EditUser;
