import "./style.css";
import { UploadOutlined } from "@ant-design/icons";
import { notification, Select, Button, Upload, Form, Input } from "antd";
import React, { useState } from "react";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { asyncCreateFeedbackAction } from "./stores/actions";
import { withTranslation } from "react-i18next";
const { Option } = Select;

function CreateFeedback1(props) {
  const { t } = props;
  const { asyncCreateDispatch } = props;
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    let news = form.getFieldValue();
    let request = new FormData();
    request.append("file", fileList[0]);
    request.append("title", news.title || "");
    request.append("type", news.type || "");
    request.append("content", news.content || "");

    const resolve = await asyncCreateDispatch(request);

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
    <div className="color3 m-0 p-3">
      <div>
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
          // autoComplete="off"
          // layout="horizontal"
        >
          <Form.Item
            label={t("Title")}
            name="title"
            rules={[
              {
                required: true,
                message: "Please input content title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={t("Image")} name="image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item label={t("Type")} name="type">
            <Select>
              <Option value="HOME">Indoor area</Option>
              <Option value="PUBLIC">Public area</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Content")}
            name="content"
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item align="baseline">
            {/* <Row gutter={24}>
              <Col offset={24}> */}
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
            {/* </Col>
            </Row> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  asyncCreateDispatch: (payload) =>
    asyncCreateFeedbackAction(dispatch)(payload),
});

const CreateFeedback = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateFeedback1)
);
export default CreateFeedback;
