import React, { useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import styled from "styled-components";
import { Button, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import exclamation from "../assets/lottie/exclamation.json";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

const FileMasker = () => {
  const files = useSelector((state) => state.files.files);
  const analysisData = useSelector((state) => state.analytics.analysisData);
  const [selectedFile, setSelectedFile] = useState(
    files[0]?.response.file.filename
  );
  const [selectedWords, setSelectedWords] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setSelectedWords([]);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getWords = () => {
    if (!analysisData[selectedFile]) return [];
    return Object.keys(analysisData[selectedFile]).map((word) => ({
      value: word,
      label: word,
    }));
  };

  const onWordChange = (value) => {
    setSelectedWords(value);
  };

  const handleMask = async () => {
    if (!selectedWords.length) {
      message.error("Please select words to mask");
      return;
    }
    setLoading(true);
    const response = await axios.post(
      apiRoutes.mask,
      {
        filename: selectedFile,
        wordsToMask: selectedWords,
      },
      {
        responseType: "blob",
      }
    );
    setLoading(false);
    if (response.status === 200) {
      message.success("File masked successfully");
      const href = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = href;
      a.setAttribute("download", `masked_${selectedFile}`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(href);
    } else {
      message.error("Failed to mask file");
    }
    console.log(response);
  };

  return (
    <MaskerContainer>
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
      </div>
      <div className="file-masker-content">
        <div className="word-select-title">
          <h4>Words to mask</h4>
          <p>Select from existing words in the file or type for a new word</p>
        </div>
        <Select
          value={selectedWords}
          placeholder="Select words to mask"
          mode="tags"
          style={{ width: "100%" }}
          options={getWords()}
          onChange={onWordChange}
        />
        <div className="button-group">
          <Button
            className="mask-button"
            style={{ fontFamily: "Ubuntu-Regular" }}
            type="primary"
            size="large"
            loading={loading}
            onClick={handleMask}
            icon={<DownloadOutlined />}
          >
            Mask and Download
          </Button>
        </div>
      </div>
    </MaskerContainer>
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

const MaskerContainer = styled.div`
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
  .file-masker-content {
    .word-select-title {
      h4 {
        margin-bottom: 0.1rem;
      }
      p {
        font-style: italic;
        color: #888;
        margin-top: 0.3rem;
      }
    }
    .button-group {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      .mask-button {
        margin: 0 0.5rem;
      }
    }
  }
`;

export default FileMasker;
