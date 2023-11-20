import React, { useEffect, useState } from "react";
import "./index.less";
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
} from "antd";
import UploadImg from "@/components/upload";
import { useDispatchLayout, useStateLayout } from "@/store/hooks";
import { useHistory } from "react-router-dom";
import { register } from "@/api";
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegistrationForm() {
  const [form] = Form.useForm();
  const layoutMode = useStateLayout()
  const history = useHistory()
  useEffect(() => {
    if (layoutMode === "FULL") {
      return
    }
  }, [])
  const onFinish = (values: any) => {
    console.log("Valeurs reçues de la forme: ", values);
    register(values).then(res => {
      message.success(res.msg)
      history.replace("/login")
    })
  };

  const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
            style={{
              width: 70,
            }}
        >
          <Option value="33">+33</Option>
        </Select>
      </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState<Array<any>>([]);

  const onWebsiteChange = (value: any) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
          [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
      <div className="login-container">
        <div className="wrapper">
          <div className="title">Cooking Academy</div>
          <div className="welcome">Create New Account</div>
          <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              className="index-form"
              scrollToFirstError
          >


            <Form.Item
                name="username"
                label="username"
                rules={[
                  {
                    required: true,
                    message: "Please entre your username",
                  },
                ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name="account"
                label="account"
                rules={[
                  {
                    required: true,
                    message: "Please entre your account",
                    whitespace: true,
                  },
                ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name="pswd"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir votre mot de passe",
                  },
                ]}
                hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button style={{ marginLeft: 20 }} className="login-form-button" onClick={() => history.replace("/login")}>Login  </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  );
}

export default RegistrationForm;

RegistrationForm.route = {
  [MENU_PATH]: "/create",
};
