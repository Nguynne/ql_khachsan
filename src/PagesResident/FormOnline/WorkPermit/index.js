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
import { asyncCreateFormsAction } from "./stores/action";
const { Option } = Select;
function CreateForM(props) {
  const { asyncCreateDispatch } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("onFinish");
    let news = form.getFieldValue();
    console.log(news);
    let request = new FormData();
    request.append("supervisorName", news.supervisorName || "");
    request.append("supervisorPhone", news.supervisorPhone || "");
    request.append("status", news.status || "");
    request.append("title", news.title || "");
    request.append("description", news.description || "");
    //công ty
    request.append("companyName", news.companyName || "");
    request.append("apartmentNo", news.apartmentNo || "");
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
        <h4>Thông tin người đăng ký</h4>
        <Form.Item
          label="Người chịu trách nhiệm:"
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
        <Form.Item
          label="Thi công ngoài giờ:"
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
        <Form.Item
          label="Phạm vi công việc:"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hạng mục sửa chữa:"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
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
  asyncCreateDispatch: (payload) => asyncCreateFormsAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateForM);
