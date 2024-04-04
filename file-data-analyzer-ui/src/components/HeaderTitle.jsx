import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.svg";

const HeaderTitle = () => {
  return (
    <Container>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <h2 className="title">File Data Analyzer & Masker</h2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
  .title {
    color: white;
  }
`;

export default HeaderTitle;
