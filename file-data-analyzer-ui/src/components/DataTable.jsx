import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DataTable = ({ selectedFile }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const analysisData = useSelector((state) => state.analytics.analysisData);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: "0.5rem",
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder="Search word"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            fontFamily: "Ubuntu-Regular",
            marginBottom: "1rem",
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              fontFamily: "Ubuntu-Regular",
              width: "7rem",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              fontFamily: "Ubuntu-Regular",
              width: "7rem",
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              fontFamily: "Ubuntu-Regular",
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              fontFamily: "Ubuntu-Regular",
            }}
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      width: "60%",
      ...getColumnSearchProps("word"),
    },
    {
      title: "Count",
      dataIndex: "count",
      width: "40%",
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
