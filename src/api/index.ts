import ajax from "@/common/ajax";

import { MessageAPi, ResponseData, LoginApi, PowerApi, MenuInfoApi, UserListApi, ResponseUserInfo, VisitorApi, VisitorListApi, MenuResponse, MenuListResponse } from "@/types"

const request = ajax;


const login = (data: any) => request.post("/login", data) as Promise<LoginApi>;

const addMsg = (data: any) => request.post("/addEvent", data) as Promise<ResponseData>;
const getMsg = (data: any) => request.get("/getEvent", data) as Promise<MessageAPi>;




export {
  login,
  addMsg,
  getMsg,
};
