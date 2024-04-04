import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Word",
    dataIndex: "word",
    width: "30%",
  },
  {
    title: "Count",
    dataIndex: "count",
    width: "20%",
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    width: "50%",
  },
];

const DataTable = ({ selectedFile }) => {
  const [data, setData] = useState([]);
  const analysisData = useSelector((state) => state.analytics.analysisData);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const fileData = analysisData[selectedFile];
    if (!fileData) {
      return;
    }
    const words = Object.keys(fileData);
    const tableData = words.map((word) => {
      return {
        key: word,
        word,
        count: fileData[word],
        meaning: "Meaning",
      };
    });
    setData(tableData);
  }, [selectedFile, analysisData]);

  return (
    <Container>
      <Table
        className="data-table"
        columns={columns}
        dataSource={data}
        scroll={{
          y: 360,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  .data-table {
    .ant-table-thead > tr > th {
      background-color: #f0f2f5;
    }
    .ant-table-body {
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          width: 0.2rem;
          border-radius: 1rem;
        }
      }
    }
  }
`;

export default DataTable;
