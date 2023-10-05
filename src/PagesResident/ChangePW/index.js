import React, { useEffect } from "react";
import { notification, Button, Form, Input } from "antd";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";

import { DownOutlined, CloseOutlined } from "@ant-design/icons";

import { asyncCreateUserAction } from "./stores/actions";
import { useNavigate } from "react-router-dom";

const ChangePW = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { asyncCreateUserDispatch } = props;
  useEffect(() => {}, []);
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const res = await asyncCreateUserDispatch(values);

    if (res.status === 200) {
      notification.open({
        message: "Change PassWord",
        description: " thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      navigate("/administrator/users");
    } else {
      notification.open({
        message: "Change PassWord",
        description: "Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  return (
    <>
      <div className="student">
        <div style={{ backgroundColor: "white" }}>
          <h6 className="p-1">Change Password</h6>
          <hr></hr>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="oldPassword"
              label="Old password"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New password"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Re-enter password"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  asyncCreateUserDispatch: (payload) =>
    asyncCreateUserAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChangePW);
