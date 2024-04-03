import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "./pages/Home";
import Ubuntu from "./assets/fonts/Ubuntu/Ubuntu-Regular.ttf";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: Ubuntu,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
