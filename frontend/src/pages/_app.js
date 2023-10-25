import "@/styles/globals.css";
import store from "@/api/store";
import { Provider } from "react-redux";
// import "../styles/index.scss";
import "@/styles/index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/api/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
