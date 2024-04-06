import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DataTable = ({ selectedFile }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const analysisData = useSelector((state) => state.analytics.analysisData);

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      width: "70%",
    },
    {
      title: "Count",
      dataIndex: "count",
      width: "30%",
    },
  ];

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
        synonym: "synonym",
      };
    });
    setPagination({
      current: 1,
      pageSize: 10,
    });
    setData(tableData);
  }, [selectedFile, analysisData]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <Container>
      <Table
        className="data-table"
        columns={columns}
        dataSource={data}
        pagination={pagination}
        scroll={{
          y: 360,
        }}
        onChange={handleTableChange}
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
