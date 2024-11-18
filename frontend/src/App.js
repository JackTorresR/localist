import { Provider } from "react-redux";
import Rotas from "./Routes";
import Store from "./redux/Store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => (
  <Provider store={Store}>
    <Rotas />
  </Provider>
);

export default App;
