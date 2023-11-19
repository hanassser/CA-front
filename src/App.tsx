import { Provider } from "react-redux";
import store from "./store";
import loadable from "@loadable/component";
const AppRouter = loadable(() => import("./router/appRouter"));
function Theme() {
  if (process.env.showColorSet) {
    const Com = loadable(() => import("@/components/theme"))
    return <Com />
  }
  return null
}
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <Theme />
    </Provider >
  );
}
export default App;
