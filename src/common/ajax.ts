import axios, { AxiosResponse, AxiosError } from "axios";
import { message, notification } from "antd";
import { getToken, clearLocalDatas, USER_INFO, TOKEN, MENU } from "@/utils";
import qs from "qs"
// request address
const BASE_URL = process.env.REACT_APP_API_BASEURL || "/api/react-ant-admin";


// error message
const codeMessage: { [key: number]: string } = {
  200: "The server successfully returned the requested data.",
  201: "The data was created or modified successfully.",
  202: "A request has been queued in the background (asynchronous task).",
  204: "The data was deleted successfully.",
  400: "The request sent has an error, and the server did not create or modify any data.",
  401: "The user is unauthorized (token, username, or password is incorrect).",
  403: "The user is authenticated but forbidden to access.",
  404: "The request was made for a record that does not exist, and the server did not perform any operation.",
  406: "The requested format is not available.",
  410: "The requested resource has been permanently deleted and will no longer be available.",
  422: "An error occurred when creating an object due to validation errors.",
  500: "The server encountered an error, please check the server.",
  502: "Bad gateway error.",
  503: "The service is unavailable, the server is temporarily overloaded or undergoing maintenance.",
  504: "Gateway timeout error."
};

// request config files
const config = {
  // `baseURL` will be automatically added before `url`, unless `url` is an absolute URL.
// It can be convenient to set a `baseURL` to pass relative URLs for methods of the axios instance.
  baseURL: BASE_URL,

  timeout: 1000 * 15,

  // `withCredentials` Indicates whether credentials are required for cross-origin requests
  withCredentials: false,

// `maxRedirects` defines the maximum number of redirects to follow in node.js
  // If set to 0, no redirects will be followed
  maxRedirects: 3,
  headers: {
    "Content-Type": " application/json;charset=UTF-8",
  },
};

//  create ajax instance
const instance = axios.create(config);
instance.interceptors.request.use(
  function (config) {
    // before send request
    let token = getToken();
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function (error) {
    // do while request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data) {
      let { msg, status } = response.data;
      if (status === 1) {
        message.error(msg);
      }
    }
    return response && response.data;
  },
  function (error: AxiosError) {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, config } = response;
      notification.error({
        message: `request error ${status}: ${config.url}`,
        description: errorText,
      });
      if (response.status === 401 || response.status === 403) {
        clearLocalDatas([USER_INFO, TOKEN, MENU]);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else if (!response) {
      notification.error({
        description: "Client exception or network problem, please clear the cache",
        message: "Abnormal state",
      });
    }
    //
    return Promise.reject(error);
  }
);

const rewriteGet = instance.get
instance.get = function (url: string, data: any, ...any) {
  let query: string = qs.stringify(data, { addQueryPrefix: true });
  return rewriteGet(url + query, ...any)
}

export default instance;
