import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.png";
import MyIcon from "@/components/icon/";
import { clearLocalDatas, USER_INFO, TOKEN, MENU } from "@/utils";
import { useCallback } from "react";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";

interface LayoutHeaderProps {
  children: JSX.Element | null
}

const { Header } = Layout;


const RightMenu = ({ logout }: { logout: () => void }) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
        log out
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement: HTMLElement) => HTMLElement;

export default function LayoutHeader({ children }: LayoutHeaderProps) {
  const userInfo = useStateUserInfo()
  const { stateClearUser } = useDispatchUser()
  const logout = useCallback(() => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    window.location.reload();
    stateClearUser();
  }, [stateClearUser]);
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>Cooking Academy</span>
      </div>
      {children}
      <div className="right">
        <Dropdown
          placement="bottom"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={logout} />}
        >
          <div>{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
