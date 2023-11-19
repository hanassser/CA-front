import { getMenus, } from "@/common";
import { MenuItem, MenuList, UserInfo, LayoutMode, MenuResponse, State, MenuMap } from "@/types"
export const USER_INFO = "USER_INFO";
export const TOKEN = "admin_token";
export const MENU = "MENU";
export const VISIBLE = "COMPONENTS_VISIBLE";
export const LAYOUT_MODE = "LAYOUT_MODE";

interface MenuOpenData {
  openKeys: string[]
  selectKey: string[]
  openedMenu: MenuItem[]
}
type Token = string | null | undefined

// 获取默认页面
async function getDefaultMenu(): Promise<MenuOpenData> {
  let openKeys: string[] = [],
    selectKey: string[] = [],
    openedMenu: MenuItem[] = [];
  const menuList = await getMenus();
  menuList.some((list) => {
    const child = list[MENU_CHILDREN]
    if (child && child.length) {
      openKeys = [(list[MENU_KEY] as string)];
      selectKey = [(child[0][MENU_KEY] as string)];
      openedMenu = [child[0]];
      return true;
    }
    return false;
  });

  return {
    openKeys,
    selectKey,
    openedMenu,
  };
}

function getSessionUser() {
  return getKey(false, USER_INFO);
}

function saveUser(info: UserInfo) {
  setKey(true, USER_INFO, info);
  setKey(false, USER_INFO, info);
}

function sleep(seconed: number) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function getLocalUser() {
  return getKey(true, USER_INFO);
}


function getMenuParentKey(list: MenuList, key: string): string[] {
  const keys = [];
  const info = list.find((item) => item[MENU_KEY] === key);
  let parentKey = info?.[MENU_PARENTKEY];
  if (parentKey) {
    const data = getMenuParentKey(list, parentKey)
    keys.push(...data);
    keys.push(parentKey);
  }
  return keys;
}

export function formatMenu(list: MenuList) {
  const newList = list.map(item => ({ ...item }))
  const menuMap: MenuMap = {};
  const parentMenu: MenuList = [];
  newList.forEach((item) => {

    const currentKey = item[MENU_KEY];

    const currentParentKey = item[MENU_PARENTKEY];

    if (!menuMap[currentKey]) {
      menuMap[currentKey] = item;
    } else {

      item[MENU_CHILDREN] = menuMap[currentKey][MENU_CHILDREN];
      menuMap[currentKey] = item;
    }

    if (currentParentKey) {

      if (!menuMap[currentParentKey]) {

        menuMap[currentParentKey] = {
          [MENU_CHILDREN]: [item],
        };
      } else if (
        menuMap[currentParentKey] &&
        !menuMap[currentParentKey][MENU_CHILDREN]
      ) {

        menuMap[currentParentKey][MENU_CHILDREN] = [item];
      } else {

        menuMap[currentParentKey][MENU_CHILDREN]?.push(item);
      }
    } else {

      parentMenu.push(item);
    }
  });
  return parentMenu;
}


function reduceMenuList(list: MenuList, path: string = ''): MenuList {
  const data: MenuList = [];
  list.forEach((i) => {
    const { children, ...item } = i;
    item.parentPath = path;
    if (children) {
      const childList = reduceMenuList(children, path + i.path);
      data.push(...childList);
    }
    data.push(item);
  });
  return data;
}

function getLocalMenu(): MenuResponse | null {
  return getKey(false, MENU);
}

function saveLocalMenu(list: MenuResponse) {
  setKey(false, MENU, list);
}

function saveToken(token: Token) {
  setKey(true, TOKEN, token)
}

function getToken(): Token {
  return getKey(true, TOKEN)
}

function getKey(isLocal: boolean, key: string) {
  return JSON.parse(getStorage(isLocal).getItem(key) || "null");
}
function getStorage(isLocal: boolean) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
function setKey(isLocal: boolean, key: string, data: any) {
  getStorage(isLocal).setItem(key, JSON.stringify(data || null));
}

function rmKey(isLocal: boolean, key: string) {
  getStorage(isLocal).removeItem(key);
}

function stopPropagation(e: MouseEvent) {
  e.stopPropagation();
}

function getLayoutMode(): LayoutMode | null {
  return getKey(true, LAYOUT_MODE);
}
function setLayoutMode(data: LayoutMode) {
  setKey(true, LAYOUT_MODE, data);
}
function clearLocalDatas(keys: string[]) {
  keys.forEach((key) => {
    rmKey(true, key);
    rmKey(false, key);
  });
}
function getCompVisible(): State["componentsVisible"] | null {
  return getKey(true, VISIBLE);
}
function setCompVisible(val: State["componentsVisible"]) {
  return setKey(true, VISIBLE, val);
}

export {
  getDefaultMenu,
  getSessionUser,
  saveUser,
  sleep,
  getLocalUser,
  getMenuParentKey,
  reduceMenuList,
  getLocalMenu,
  saveLocalMenu,
  saveToken,
  getToken,
  getKey,
  setKey,
  rmKey,
  stopPropagation,
  getLayoutMode,
  setLayoutMode,
  clearLocalDatas,
  getCompVisible,
  setCompVisible,
};
