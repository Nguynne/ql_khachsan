import "./index.css";
import { UploadOutlined } from "@ant-design/icons";
import { notification, Select, Button, Upload, Form, Input } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import { asyncCreateAccountAction } from "./stores/action";
const { Option } = Select;

function CreateAccount1(props) {
  const { t } = props;
  const { asyncCreateDispatch } = props;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let news = form.getFieldValue();
    let request = new FormData();
    request.append("username", news.username || "");
    request.append("fullName", news.fullName || "");
    request.append("gender", news.gender || "");
    request.append("email", news.email || "");
    request.append("phoneNumber", news.phoneNumber || "");
    request.append("address", news.address || "");

    const resolve = await asyncCreateDispatch(request);

    if (resolve.status === 200) {
      notification.open({
        message: "Create Account ",
        description: "Create Account thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      form.resetFields();
    } else {
      notification.open({
        message: "Create Account",
        description: "Create Account Thất bại",
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
            label={t("tên đăng nhập:")}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input content username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Tên đầy đủ")}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input content fullName!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={t("Giới tính")} name="gender">
            <Select>
              <Option>nam</Option>
              <Option>nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Email")}
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
            label={t("Số điện thoại")}
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input content phoneNumber!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Địa chỉ:")}
            name="address"
            rules={[
              {
                required: true,
                message: "Please input content address!",
              },
            ]}
          >
            <Input />
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
  asyncCreateDispatch: (payload) => asyncCreateAccountAction(dispatch)(payload),
});

const CreateAccount = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateAccount1)
);
export default CreateAccount;
