import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import styled from "styled-components";
import axios from "axios";

import { setFiles } from "../reducers/filesSlice";
import { apiRoutes } from "../utils/apiRoutes";

const { Dragger } = Upload;

const FileUpload = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [fileList, setFileList] = useState(files);

  const handleFileChange = (info) => {
    const { status } = info.file;
    let newFileList = [...info.fileList];

    newFileList = newFileList.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        )
    );
    setFileList(newFileList);
    const currentFiles = info.fileList
      .filter((file) => file.status !== "error")
      .map((file) => {
        return {
          uid: file.uid,
          name: file.name,
          size: file.size,
          type: file.type,
          status: file.status,
          lastModified: file.lastModified,
          response: file.response,
        };
      });
    if (status === "done") {
      dispatch(setFiles(currentFiles));
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      dispatch(setFiles(currentFiles));
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFileRemove = (file) => {
    const filteredFiles = files.filter((f) => f.uid !== file.uid);
    dispatch(setFiles(filteredFiles));
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("lastModified", file.lastModified);
    axios
      .post(apiRoutes.upload, formData)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch(onError);
  };

  const props = {
    name: "file",
    accept: ".txt,.docx",
    multiple: true,
    action: apiRoutes.upload,
    customRequest,
    onChange: handleFileChange,
    onRemove: handleFileRemove,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Container>
      <Dragger {...props} fileList={fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text" style={{ marginBottom: "0.2rem" }}>
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ marginTop: "0.2rem" }}>
          We currently support .txt, .docx file formats.
        </p>
      </Dragger>
      {/* <SelectedFiles /> */}
    </Container>
  );
};

const Container = styled.div``;

export default FileUpload;
