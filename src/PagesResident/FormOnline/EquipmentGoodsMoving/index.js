import "./index.css";
// import { UploadOutlined } from "@ant-design/icons";
import {
  notification,
  Select,
  Button,
  // Upload,
  Form,
  Input,
  Row,
  Col,
  // Image,
  Menu,
} from "antd";
import React, { useState, useEffect } from "react";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { asyncCreateFormAction } from "./stores/action";
const { Option } = Select;
function CreateForm(props) {
  const { asyncCreateDispatch } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("onFinish");
    let news = form.getFieldValue();
    console.log(news);
    let request = new FormData();

    request.append("status", news.status || "");
    request.append("formType", news.formType || "");
    request.append("owner", news.owner || "");
    request.append("apartmentNo", news.apartmentNo || "");
    request.append("phoneNumber", news.phoneNumber || "");
    request.append("email", news.email || "");
    request.append("description", news.description || "");
    //công ty
    request.append("companyName", news.companyName || "");
    request.append("companyAddress", news.companyAddress || "");
    request.append("companyPhone", news.companyPhone || "");
    request.append("supervisorName", news.supervisorName || "");
    request.append("supervisorPhone", news.supervisorPhone || "");
    console.log(request);
    const resolve = await asyncCreateDispatch(request);
    console.log("resolve");
    console.log(resolve);
    if (resolve.status === 200) {
      notification.open({
        message: "Create feedbacks",
        description: "Create feedbacks thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      form.resetFields();
    } else {
      notification.open({
        message: "Create feedbacks",
        description: "Create feedbacks Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        name="form"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 22,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
      >
        <h4>Thông tin người đăng ký di chuyển tài sản</h4>
        <Form.Item label="Hình thức di chuyển" name="status">
          <Select>
            <Option value="HOME">chuyển vào</Option>
            <Option value="PUBLIC">chuyển ra</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Người đăng ký" name="formType">
          <Select>
            <Option value="HOME">Chủ hộ</Option>
            <Option value="PUBLIC">Khách thuê</Option>
            <Option value="PUBLIC">Nhà thầu</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên chủ hộ"
          name="owner"
          rules={[
            {
              required: true,
              message: "Please input owner!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số căn hộ/KV làm việc:"
          name="apartmentNo"
          rules={[
            {
              required: true,
              message: "Please input apartmentNo!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại:"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input phoneNumber!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input apartmentNo!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <h4>Thông tin Công ty vận chuyển</h4>
        <Form.Item
          label="Tên công ty:"
          name="companyName"
          rules={[
            {
              required: true,
              message: "Please input companyName!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ công ty:"
          name="companyAddress"
          rules={[
            {
              required: true,
              message: "Please input companyAddress!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại công ty:"
          name="companyPhone"
          rules={[
            {
              required: true,
              message: "Please input companyPhone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Người liên hệ/ Giám sát:"
          name="supervisorName"
          rules={[
            {
              required: true,
              message: "Please input supervisorName!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại:"
          name="supervisorPhone"
          rules={[
            {
              required: true,
              message: "Please input supervisorPhone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item align="baseline">
          <Row gutter={24}>
            <Col offset={24}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  asyncCreateDispatch: (payload) => asyncCreateFormAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateForm);
