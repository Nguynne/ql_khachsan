import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncCreateConfigAction, getCofigAction } from "./stores/actions";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { selectData } from "./stores/selectors";
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
const Configuration = (props) => {
  const [form] = Form.useForm();
  const { asyncCreateConfigDispatch, getConfigDispatch } = props;
  useEffect(() => {
    const onLoad = async () => {
      const res = await getConfigDispatch();
      if (res) {
        form.setFieldsValue({
          username: res.email,
          host: res.host,
          password: res.password,
          Port: res.port,
          display: res.displayName,
        });
      }
    };
    onLoad();
  }, []);
  const onFinish = async (values) => {
    const res = await asyncCreateConfigDispatch(values);

    if (res.status === 201 || res.status === 200) {
      alert("success");
    } else {
      alert("loi roi");
    }
  };

  return (
    <>
      <div className="student">
        <div style={{ backgroundColor: "white" }}>
          <h4>Email Smtp Settings</h4>
          <hr></hr>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{}}
            scrollToFirstError
          >
            <Form.Item name="username" label="Email: ">
              <Input />
            </Form.Item>

            <Form.Item name="host" label="Host: ">
              <Input />
            </Form.Item>

            <Form.Item name="Port" label="Port">
              <InputNumber />
            </Form.Item>

            <Form.Item name="display" label="Display Name: ">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password: ">
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
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
const mapStateToProps = createStructuredSelector({
  dataConfig: selectData,
});

const mapDispatchToProps = (dispatch) => ({
  getConfigDispatch: (payload) => getCofigAction(dispatch)(payload),
  asyncCreateConfigDispatch: (payload) =>
    asyncCreateConfigAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Configuration);
