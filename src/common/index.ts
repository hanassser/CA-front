import { getLocalMenu, saveLocalMenu } from "../utils";
import { getMenu } from "@/api";
import { MenuResponse } from "@/types"
let currentJob: Promise<MenuResponse> | null
const loginPath = process.env.REACT_APP_ROUTERBASE + "/login"
// register path 
const registerPath = process.env.REACT_APP_ROUTERBASE + "/create"
export function getMenus() {
  if (currentJob) {
    return currentJob
  }
  const job: Promise<MenuResponse> = new Promise((reslove) => {
    let localMenu = getLocalMenu();
    if (localMenu) {
      return reslove(localMenu);
    }
    let path = window.location.pathname
    if (path === registerPath || path === loginPath) {
      return reslove([]);
    }
    getMenu()
      .then((result) => {
        console.log(result);
        if (Array.isArray(result)) {
          saveLocalMenu(result);
          reslove(result);
        } else {
          reslove([]);
        }
      })
      .catch((err) => {
        reslove([]);
      });
  });
  currentJob = job
  job.finally(() => { currentJob = null })
  return job
}
