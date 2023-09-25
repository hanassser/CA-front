import ajax from "@/common/ajax";

import {  ResponseData, LoginApi, } from "@/types"

const request = ajax;


const login = (data: any) => request.post("/login", data) as Promise<LoginApi>;

const addMsg = (data: any) => request.post("/addEvent", data) as Promise<ResponseData>;



export {
  login,
  addMsg,
};
