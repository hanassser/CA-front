import { BrowserRouter, HashRouter } from "react-router-dom";
import Layout from "@/layout";

const isHash = process.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"


export default function AppRouter() {
  if (isHash) {
    return <HashRouter basename={RouterBasename}>
      <Layout />
    </HashRouter>
  }
  return (
      <BrowserRouter basename={RouterBasename}>
        <Layout />
      </BrowserRouter>
  );
}
