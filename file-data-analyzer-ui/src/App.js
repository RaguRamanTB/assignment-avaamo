import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Ubuntu from "./assets/fonts/Ubuntu/Ubuntu-Regular.ttf";
import { store } from "./store";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: Ubuntu,
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
