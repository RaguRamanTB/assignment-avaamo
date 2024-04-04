import React from "react";
import { Divider, List } from "antd";
import { useSelector } from "react-redux";

const SelectedFiles = () => {
  const files = useSelector((state) => state.files.files);

  return (
    files.length > 0 && (
      <div>
        <Divider orientation="center">{`Current selected files (${files.length})`}</Divider>
        <List
          size="small"
          bordered
          dataSource={files}
          renderItem={(file) => (
            <List.Item>
              <List.Item.Meta
                title={file.name}
                description={`Size: ${file.size} bytes`}
              />
            </List.Item>
          )}
        />
      </div>
    )
  );
};

export default SelectedFiles;
