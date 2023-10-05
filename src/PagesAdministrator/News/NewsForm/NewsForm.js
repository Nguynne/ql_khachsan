import "./NewsForm.css";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Form, Input, Row, Col, Image, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  asyncCreateNewsAction,
  asyncGetDetailNewsAction,
  asyncUpdateNewsAction,
} from "../stores/action";
import { useNavigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewsFormComponent(props) {
  const { createNewsDispatch, getDetailNewsDispatch, updateNewsDispatch } =
    props;
  const [fileList, setFileList] = useState([]);
  const [formImage, setFormImage] = useState("");
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = props
  const navigate = useNavigate();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "code"],
        ["clean"],
      ],
      // handlers: {
      //   image: imageHandler
      // },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
  ];
  useEffect(() => {
    const getFormDetail = async () => {
      setIsLoading(true);
      const response = await getDetailNewsDispatch(id);
      if (response.status === 200) {
        form.setFieldsValue({
          title: response.data.result.title,
          tag: response.data.result.tag,
          description: response.data.result.description,
          id: response.data.result.id,
        });
        setFormImage(
          `data:image/png;charset=utf-8;base64, ${response.data.result.imageUrl}`
        );
      }
      setIsLoading(false);
    };
    if (!props.onCreate) {
      getFormDetail();
    }
  }, []);
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
    request.append("description", news.description || "");
    request.append("tag", news.tag || "");
    if (props.onCreate) {
      const resolve = await createNewsDispatch(request);
      if (resolve === 200) {
        navigate("/administrator/news");
      }
    } else {
      request.append("id", news.id);
      const resolve = await updateNewsDispatch(request);
      if (resolve.status === 200) {
        navigate("/administrator/news");
      }
    }
  };

  return (
    <Spin spinning={isLoading}>
      <p className="news-breadcrumb">
        {t("Home")} / <span className="current-breadcrumb">{t("adNews")}</span>
      </p>
      <h1 className="news-title">{t("NewsTitle")}</h1>
      <Form
        form={form}
        name="form"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 22,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
      >
        <Form.Item label="Id" name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item label={t("NewsImage")} name="image">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Image
            width={200}
            src={formImage}
            style={{ display: props.onCreate ? "none" : "", paddingTop: 20 }}
          />
        </Form.Item>
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

        <Form.Item
          label={t("Tag")}
          name="tag"
          rules={[
            {
              required: true,
              message: "Please input tag!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("Content")}
          name="description"
          rules={[
            {
              required: true,
              message: "Please input content!",
            },
          ]}
        >
          {/* <Input.TextArea rows={10} /> */}
          <ReactQuill
            theme="snow"
            style={{ height: '300px', backgroundColor: 'white', paddingBottom: '40px' }}
            modules={modules}
            formats={formats}
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
  createNewsDispatch: (payload) => asyncCreateNewsAction(dispatch)(payload),
  getDetailNewsDispatch: (payload) =>
    asyncGetDetailNewsAction(dispatch)(payload),
  updateNewsDispatch: (payload) => asyncUpdateNewsAction(dispatch)(payload),
});

const NewsForm = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NewsFormComponent)
)
export default NewsForm;
