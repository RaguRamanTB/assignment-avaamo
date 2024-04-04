import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import styled from "styled-components";
import { setFiles } from "../reducers/filesSlice";
import SelectedFiles from "./SelectedFiles";

const { Dragger } = Upload;

const FileUpload = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  const handleFileChange = (info) => {
    const { status } = info.file;
    const files = info.fileList.map((file) => {
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
      dispatch(setFiles(files));
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      dispatch(setFiles(files));
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFileRemove = (file) => {
    const filteredFiles = files.filter((f) => f.uid !== file.uid);
    dispatch(setFiles(filteredFiles));
  };

  const props = {
    name: "file",
    accept: ".txt,.doc,.docx,.pdf",
    multiple: true,
    action: "http://localhost:5000/upload",
    onChange: handleFileChange,
    onRemove: handleFileRemove,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Container>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text" style={{ marginBottom: "0.2rem" }}>
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ marginTop: "0.2rem" }}>
          We currently support .txt, .pdf, .doc, .docx file formats.
        </p>
      </Dragger>
      <SelectedFiles />
    </Container>
  );
};

const Container = styled.div``;

export default FileUpload;
