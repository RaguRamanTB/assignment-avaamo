import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import styled from "styled-components";
import { Select, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

import exclamation from "../assets/lottie/exclamation.json";
import analyzing from "../assets/lottie/analyzing.json";
import DataTable from "./DataTable";
import { apiRoutes } from "../utils/apiRoutes";
import { setAnalysisData } from "../reducers/analyticsSlice";

const FileAnalyzer = () => {
  const files = useSelector((state) => state.files.files);
  const analysisData = useSelector((state) => state.analytics.analysisData);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    files[0]?.response.file.filename
  );
  const [fileSize, setFileSize] = useState(files[0]?.size);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!files.length) {
        return;
      }
      if (files.every((file) => analysisData[file.response.file.filename])) {
        return;
      }
      setLoading(true);
      const response = await axios.post(apiRoutes.getAnalysis, {
        filenames: files.map((file) => file.response.file.filename),
      });
      setLoading(false);
      if (response.status !== 200) {
        message.error("Failed to fetch analysis data");
        return;
      }
      dispatch(setAnalysisData(response.data.analysisData));
    };
    fetchAnalysis();
  }, [files, analysisData, dispatch]);

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
    setSelectedFile(value);
    setFileSize(
      files.find((file) => file.response.file.filename === value).size
    );
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <div className="loading-lottie">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: analyzing,
              }}
            />
          </div>
        </LoadingContainer>
      ) : (
        <AnalyzerContainer>
          <div className="file-analyzer-header">
            <h3>File: </h3>
            <Select
              className="file-select"
              showSearch
              placeholder="Select a file"
              defaultValue={files[0].response.file.filename}
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={files.map((file) => ({
                value: file.response.file.filename,
                label: file.name,
              }))}
            />
            <div className="file-size">
              <h3>Size: </h3>
              <p>{fileSize} bytes</p>
            </div>
          </div>
          <div className="file-analyzer-content">
            <DataTable selectedFile={selectedFile} />
          </div>
        </AnalyzerContainer>
      )}
    </>
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-lottie {
    height: 20rem;
    width: 20rem;
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
    .file-size {
      display: flex;
      align-items: baseline;
      margin-left: 1rem;
      p {
        font-size: 1rem;
        margin-left: 0.5rem;
      }
    }
  }
  .file-analyzer-content {
    margin-top: 1rem;
  }
`;

export default FileAnalyzer;
