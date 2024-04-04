import React, { useEffect, useState } from "react";
import { Skeleton, Table } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { dictionaryApi } from "../utils/apiRoutes";

const DataTable = ({ selectedFile }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const analysisData = useSelector((state) => state.analytics.analysisData);

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
      title: "Synonym",
      dataIndex: "synonym",
      width: "50%",
      render: (text) =>
        loading ? (
          <Skeleton.Input active size="small" />
        ) : (
          <p
            style={{
              margin: 0,
              padding: 0,
              fontWeight: text === "No synonym found" ? 700 : 0,
            }}
          >
            {text}
          </p>
        ),
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
    setData(tableData);
    fetchMeanings(tableData.slice(0, 10), 0);
  }, [selectedFile, analysisData]);

  const fetchMeanings = async (currentData, start) => {
    setLoading(true);
    const updatedData = await Promise.all(
      currentData.map(async (row) => {
        const response = await axios.get(dictionaryApi + row.word);
        if (response.status !== 200) {
          return { ...row, synonym: "Failed to fetch synonym" };
        }
        const { def } = response.data;
        if (!def.length) {
          return { ...row, synonym: "No synonym found" };
        }
        return { ...row, synonym: def[0].tr[0].text };
      })
    );
    setData((prevData) => {
      const newData = [...prevData];
      for (let i = 0; i < updatedData.length; i++) {
        newData[start + i] = updatedData[i];
      }
      return newData;
    });
    setLoading(false);
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const currentPageData = data.slice(start, end);
    fetchMeanings(currentPageData, start);
  };

  return (
    <Container>
      <Table
        className="data-table"
        columns={columns}
        dataSource={data}
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
