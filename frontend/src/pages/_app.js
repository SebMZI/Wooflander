import "@/styles/globals.css";
import store from "@/api/store";
import { Provider } from "react-redux";
import "../styles/index.scss"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
