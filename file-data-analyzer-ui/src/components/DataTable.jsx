import React from "react";
import { Table } from "antd";
import styled from "styled-components";

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

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    word: `Edward King ${i}`,
    count: 32,
    meaning: `London, Park Lane no. ${i}`,
  });
}

const DataTable = () => {
  return (
    <Container>
      <Table
        className="data-table"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 15,
        }}
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
