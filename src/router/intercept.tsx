import { useCallback, useEffect, useMemo, useState } from "react";
import { Spin } from "antd"
import { getLocalUser, getMenuParentKey } from "@/utils";
import { Redirect, useLocation } from "react-router-dom";
import { MenuItem } from "@/types";
import { useDispatchLayout, useDispatchMenu, useDispatchUser, useStateUserInfo } from "@/store/hooks";

const scrollPage = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

const fallback = <Spin style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 500,
  fontSize: 24,
}} tip="chargement des pages...." />

interface Props {
  [MENU_PATH]?: string
  [MENU_TITLE]?: string
  pageKey: string
  menuList: Array<MenuItem>
  [key: string]: any
}

function Intercept({ menuList, components: Components, [MENU_TITLE]: title, [MENU_PATH]: pagePath, pageKey, ...itemProps }: Props) {
  const [pageInit, setPageInit] = useState(false)
  const location = useLocation()
  const { stateChangeLayout } = useDispatchLayout()
  const { stateSetOpenMenuKey, stateSetSelectMenuKey, stateAddOpenedMenu, stateSetCurrentPath } = useDispatchMenu()
  const { stateSetUser } = useDispatchUser()
  const userInfo = useStateUserInfo()


  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        stateSetUser(localInfo);
      }
      return
    }
  }, [stateSetUser, userInfo]);

  const currentPath = useMemo(() => {
    const { pathname, search } = location
    return pathname + search
  }, [location])

  // 监听 location 改变
  const onPathChange = useCallback(() => {
    stateSetCurrentPath(currentPath)
    stateAddOpenedMenu({ key: pageKey, path: currentPath, title: title || "title information not configured" });
  }, [currentPath, pageKey, title, stateSetCurrentPath, stateAddOpenedMenu])

  const setCurrentPageInfo = useCallback(() => {
    if (!title) {
      return;
    }
    document.title = title;
    stateSetSelectMenuKey([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    stateSetOpenMenuKey(openkey);
    stateAddOpenedMenu({ key: pageKey, path: currentPath, title });
  }, [currentPath, menuList, title, pageKey, stateSetOpenMenuKey, stateSetSelectMenuKey, stateAddOpenedMenu])

  const init = useCallback(() => {
    setCurrentPageInfo()
    scrollPage()
  }, [setCurrentPageInfo])

  useEffect(() => {
    if (init && !pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])

  useEffect(() => {
    if (pageInit) {
      onPathChange()
    }
  }, [onPathChange, pageInit])

  useEffect(() => {
    if (pagePath === "/create" || pagePath === "/login") {
      stateChangeLayout("FULL")
    } else {
      stateChangeLayout("TWO_COLUMN")
    }
  }, [stateChangeLayout, pagePath])
  const hasPath = !menuList.find(
      (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === pagePath
  );
  console.log(hasPath, pagePath)

  // if (hasPath && pagePath !== "/" && pagePath !== "*") {
  //   return (
  //     <Error
  //       status="403"
  //       errTitle="Autorité insuffisante"
  //       subTitle="Sorry, you are not authorized to access this page."
  //     />
  //   );
  // }
  if (!userInfo && !(pagePath === "/login" || pagePath === "/create")) {
    return <Redirect to="/login" />
  }
  return (
      <Components
          {...itemProps}
          fallback={fallback}
      />
  );
}
export default Intercept
