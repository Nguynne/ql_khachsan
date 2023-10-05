import "./SystemServicesForm.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Upload,
  Form,
  Input,
  Row,
  Col,
  Image,
  Radio,
  Select,
  InputNumber,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";

import { compose } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  asyncCreateSystemServicesAction,
  asyncGetDetailSystemServicesAction,
  asyncUpdateSystemServicesAction,
} from "../stores/action";
import { useNavigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";

function SystemServicesFormComponent(props) {
  const {
    createSystemServicesDispatch,
    getDetailSystemServicesDispatch,
    updateSystemServicesDispatch,
  } = props;
  const [fileListInfo, setFileListInfo] = useState([]);
  const [fileListInfoVN, setFileListInfoVN] = useState([]);
  const [formImage, setFormImage] = useState(["", ""]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = props;

  useEffect(() => {
    const getFormDetail = async () => {
      setIsLoading(true);
      const response = await getDetailSystemServicesDispatch(id);
      if (response.status === 200) {
        form.setFieldsValue({
          id: response.data.result.id,
          name: response.data.result.name,
          type: response.data.result.type,
          status: response.data.result.status,
          description: response.data.result.description,
          contact: response.data.result.contact,
          phoneNumber: response.data.result.phoneNumber,
          email: response.data.result.email,
          isQr: response.data.result.isQr,
          capicity: response.data.result.capicity,
          minReorderDate: response.data.result.minReorderDate,
          maxReorderDate: response.data.result.maxReorderDate,
          cancelReorderDate: response.data.result.cancelReorderDate,
          imageUrl: response.data.result.imageUrl,
          rules: response.data.result.rules,
          rulesVN: response.data.result.rulesVN,
        });
        setFormImage([
          response.data.result.rules,
          response.data.result.rulesVN,
        ]);
      }
      setIsLoading(false);
    };
    if (!props.onCreate) {
      getFormDetail();
    }
  }, []);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const uploadPropsInfo = {
    onRemove: (file) => {
      const index = fileListInfo.indexOf(file);
      const newFileList = fileListInfo.slice();
      newFileList.splice(index, 1);
      setFileListInfo(newFileList);
    },
    beforeUpload: (file) => {
      setFileListInfo([...fileListInfo, file]);
      return false;
    },
    fileListInfo,
  };

  const uploadPropsInfoVN = {
    onRemove: (file) => {
      const index = fileListInfoVN.indexOf(file);
      const newFileList = fileListInfoVN.slice();
      newFileList.splice(index, 1);
      setFileListInfoVN(newFileList);
    },
    beforeUpload: (file) => {
      setFileListInfoVN([...fileListInfoVN, file]);
      return false;
    },
    fileListInfoVN,
  };

  const onFinish = async (values) => {
    const result = values;
    if (fileListInfo.length !== 0) {
      result.rules = await convertToBase64(fileListInfo[0]);
    }
    if (fileListInfoVN.length !== 0) {
      result.rulesVN = await convertToBase64(fileListInfoVN[0]);
    }
    if (props.onCreate) {
      const resolve = await createSystemServicesDispatch(result);
      if (resolve === 200) {
        navigate("/administrator/services/system");
      }
    } else {
      const resolve = await updateSystemServicesDispatch(result);

      if (resolve.status === 200) {
        navigate("/administrator/services/system");
      }
    }
  };

  return (
    <Spin spinning={isLoading}>
      <p className="news-breadcrumb">
        {t("Home")} / <span className="current-breadcrumb">{t("ServicesTitle")}</span>
      </p>
      <h1 className="news-title">{t("ListServicesTitle")}</h1>
      <Form
        form={form}
        initialValues={{
          isQr: 1,
          capicity: 0,
          minReorderDate: 0,
          maxReorderDate: 0,
          cancelReorderDate: 0,
          remember: true,
        }}
        name="form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
      >
        <Form.Item label="Id" name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t("ServiceName")}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input service name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("ServicesType")}
          name="type"
          rules={[
            {
              required: true,
              message: "Please input service type!",
            },
          ]}
        >
          <Select style={{ width: 100 }}>
            <Select.Option value="Public">Public</Select.Option>
            <Select.Option value="Private">Private</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t("Status")}
          name="status"
          rules={[
            {
              required: true,
              message: "Please input service status!",
            },
          ]}
        >
          <Select style={{ width: 100 }}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Close">Close</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t("Description")}
          name="description"
          rules={[
            {
              required: true,
              message: "Please input service description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("Contact")} name="contact">
          <Input />
        </Form.Item>
        <Form.Item label={t("PhoneNumber")} name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Is QR" name="isQr">
          <Radio.Group>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={t("Capacity")}
          name="capicity"
          rules={[
            {
              required: true,
              message: "Please input service capicity!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Min Reorder Date" name="minReorderDate">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Max Reorder Date" name="maxReorderDate">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Cancel Reorder Date" name="cancelReorderDate">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Image Url"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: "Please input service image Url!",
            },
            {
              type: "url",
              message: "Must be image url!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("RulesEN")} name="rules">
          <Upload {...uploadPropsInfo}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Image
            width={"50%"}
            src={formImage[0]}
            style={{ display: props.onCreate ? "none" : "", paddingTop: 20 }}
          />
        </Form.Item>
        <Form.Item label={t("RulesVN")} name="rulesVN">
          <Upload {...uploadPropsInfoVN}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Image
            width={"50%"}
            src={formImage[1]}
            style={{ display: props.onCreate ? "none" : "", paddingTop: 20 }}
          />
        </Form.Item>

        <Form.Item align="baseline">
          <Row gutter={24}>
            <Col offset={24}>
              <Button type="primary" htmlType="submit">
                {t("Submit")}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  createSystemServicesDispatch: (payload) =>
    asyncCreateSystemServicesAction(dispatch)(payload),
  getDetailSystemServicesDispatch: (payload) =>
    asyncGetDetailSystemServicesAction(dispatch)(payload),
  updateSystemServicesDispatch: (payload) =>
    asyncUpdateSystemServicesAction(dispatch)(payload),
});

//const withConnect = connect(mapStateToProps, mapDispatchToProps);
const SystemServicesForm = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SystemServicesFormComponent)
)
export default SystemServicesForm;
