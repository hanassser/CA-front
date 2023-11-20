import { useCallback, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";
import MyIcon from "@/components/icon";
import { saveUser, getLocalUser, saveToken } from "@/utils";
import { setUserInfoAction } from "@/store/user/action";
import { login } from "@/api";
import { UserInfo } from "@/types"
import "./index.less";
import { Link, useHistory, useLocation } from "react-router-dom";

const initialValues = {
  remember: true,
  ...getLocalUser(),
}

const IPT_RULE_USERNAME = [
  {
    required: true,
    message: "veuillez entrer le nom d'utilisateur",
  },
];

const IPT_RULE_PASSWORD = [
  {
    required: true,
    message: "veuillez entrer le mot de passe",
  },
];

function useLogin(setUserInfo: (info: UserInfo) => void) {
  const [btnLoad, setBtnLoad] = useState(false);
  const history = useHistory()
  const onFinish = (values: any) => {
    setBtnLoad(true);
    login(values)
        .then((res) => {
          const { data, msg, status, token } = res;
          setBtnLoad(false);
          if (status === 1 && !data) return;
          const info = Object.assign({ isLogin: true }, data)
          saveToken(token);
          message.success(msg);
          if (values.remember) {
            saveUser(info);
          }
          setUserInfo(info);
          history.push("/")
          window.location.reload()
        })
        .catch(() => {
          setBtnLoad(false);
        });
  };
  return { btnLoad, onFinish, history };
}

export default function Login() {
  const dispatch = useDispatch()
  const setUserInfo = useCallback((info) => dispatch(setUserInfoAction(info)), [dispatch])
  const { btnLoad, onFinish, history } = useLogin(setUserInfo);
  return (
      <div className="login-container">
        <div className="wrapper">
          <div className="title">Cooking Academy</div>
          <div className="welcome">Bienvenue, veuillez d'abord vous connecter</div>
          <Form
              className="login-form"
              initialValues={initialValues}
              onFinish={onFinish}
          >
            <Form.Item name="account" rules={IPT_RULE_USERNAME}>
              <Input
                  prefix={<MyIcon type="icon_nickname" />}
                  placeholder="compte"
              />
            </Form.Item>
            <Form.Item name="pswd" rules={IPT_RULE_PASSWORD}>
              <Input
                  prefix={<MyIcon type="icon_locking" />}
                  type="password"
                  autoComplete="off"
                  placeholder="mot de passe"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>souviens moi</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item className="btns">
              <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={btnLoad}
              >
                Login
              </Button>


              <Button className="login-form-button" onClick={() => history.replace("/create")}>Create  </Button>

            </Form.Item>
          </Form>
        </div>
      </div>
  );
}

Login.route = {
  [MENU_PATH]: "/login"
}
