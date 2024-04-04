import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import styled from "styled-components";

const { Dragger } = Upload;

const props = {
  name: "file",
  accept: ".txt,.doc,.docx,.pdf",
  multiple: true,
  action: "http://localhost:5000/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const FileUpload = () => {
  return (
    <Container>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          We currently support .txt, .pdf, .doc, .docx file formats.
        </p>
      </Dragger>
    </Container>
  );
};

const Container = styled.div``;

export default FileUpload;
