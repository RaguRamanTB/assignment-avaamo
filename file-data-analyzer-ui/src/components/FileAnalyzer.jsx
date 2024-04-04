import React from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import styled from "styled-components";
import { Select } from "antd";

import exclamation from "../assets/lottie/exclamation.json";
import DataTable from "./DataTable";

const FileAnalyzer = () => {
  const files = useSelector((state) => state.files.files);

  if (!files.length) {
    return (
      <NoFilesContainer>
        <div className="no-files-lottie">
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: exclamation,
            }}
          />
        </div>
        <div className="no-files-text">
          <h3>No files uploaded</h3>
        </div>
      </NoFilesContainer>
    );
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <AnalyzerContainer>
      <div className="file-analyzer-header">
        <h3>File: </h3>
        <Select
          className="file-select"
          showSearch
          placeholder="Select a file"
          defaultValue={files[0].uid}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={files.map((file) => ({
            value: file.uid,
            label: file.name,
          }))}
        />
      </div>
      <div className="file-analyzer-content">
        <DataTable />
      </div>
    </AnalyzerContainer>
  );
};

const NoFilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-files-lottie {
    height: 8rem;
    width: 8rem;
  }
`;

const AnalyzerContainer = styled.div`
  .file-analyzer-header {
    display: flex;
    justify-content: left;
    align-items: center;
    .file-select {
      width: 100%;
      max-width: 40rem;
      margin-left: 1rem;
    }
  }
  .file-analyzer-content {
    margin-top: 1rem;
  }
`;

export default FileAnalyzer;
