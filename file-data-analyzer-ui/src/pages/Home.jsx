import React from "react";
import { useSelector } from "react-redux";
import { Layout, theme } from "antd";
import styled from "styled-components";
import HeaderTitle from "../components/HeaderTitle";
import FileSteps from "../components/FileSteps";
import FileUpload from "../components/FileUpload";
import FileAnalyzer from "../components/FileAnalyzer";
import FileMasker from "../components/FileMasker";

const { Header, Content, Sider, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentStep = useSelector((state) => state.step.currentStep);

  return (
    <Container>
      <Layout className="main-layout">
        <Header className="header">
          <HeaderTitle />
        </Header>
        <Content className="content">
          <Layout
            className="site-layout-background"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              className="sider"
              style={{
                background: colorBgContainer,
              }}
              width={300}
            >
              <FileSteps />
            </Sider>
            <Content
              style={{
                padding: "0 2rem",
                minHeight: 300,
              }}
            >
              {currentStep === 0 && <FileUpload />}
              {currentStep === 1 && <FileAnalyzer />}
              {currentStep === 2 && <FileMasker />}
            </Content>
          </Layout>
        </Content>
        <Footer className="footer">
          Crafted with {"\uD83D\uDC9C"} by{" "}
          <a
            target="_blank"
            href="https://github.com/RaguRamanTB"
            rel="noreferrer"
          >
            Raguraman
          </a>
        </Footer>
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  .main-layout {
    min-height: 100vh;
    overflow: hidden;
    .header {
      display: flex;
      align-items: center;
    }
    .content {
      padding: 0 2rem;
      .site-layout-background {
        margin: 2rem 0;
        padding: 2rem 0;
        .sider {
          min-height: 100%;
          border-right: 0.15rem solid rgba(0, 0, 0, 0.3);
          .ant-layout-sider-children {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .footer {
      text-align: center;
      font-weight: 700;
    }
  }
`;

export default Home;
