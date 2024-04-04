import { Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const SelectedFiles = () => {
  const files = useSelector((state) => state.files.files);

  return (
    files.length > 0 && (
      <div>
        <Divider orientation="center">Selected Files</Divider>
        <ol>
          {files.map((file, index) => (
            <li key={`${Date.now()}-${index}`}>
              <h4 style={{ marginBottom: "0.2rem" }}>{file.name}</h4>
              <p style={{ marginTop: "0.2rem" }}>Size: {file.size} bytes</p>
            </li>
          ))}
        </ol>
      </div>
    )
  );
};

export default SelectedFiles;
