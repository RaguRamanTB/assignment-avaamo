import React from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import exclamation from "../assets/lottie/exclamation.json";
import styled from "styled-components";

const FileAnalyzer = () => {
  const files = useSelector((state) => state.files);

  if (!files.length) {
    return (
      <Container>
        <div className="no-files-lottie">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: exclamation,
            }}
          />
        </div>
        <div className="no-files-text">
          <h3>No files uploaded</h3>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <h2>File Analysis</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <h3>{file.name}</h3>
            <p>Size: {file.size} bytes</p>
            <p>Type: {file.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-files-lottie {
    height: 8rem;
    width: 8rem;
  }
`;

export default FileAnalyzer;
