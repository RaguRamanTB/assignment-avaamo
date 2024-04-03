import React from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";
import HeaderTitle from "../components/HeaderTitle";
import FileSteps from "../components/FileSteps";

const { Header, Content, Sider, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Content>
        <Footer className="footer">
          Crafted with {"\uD83D\uDC9C"} by{" "}
          <a href="https://github.com/RaguRamanTB">Raguraman</a>
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
          height: 100%;
          border-right: 0.15rem solid rgba(0, 0, 0, 0.3);
        }
      }
    }
    .footer {
      text-align: center;
    }
  }
`;

export default Home;
