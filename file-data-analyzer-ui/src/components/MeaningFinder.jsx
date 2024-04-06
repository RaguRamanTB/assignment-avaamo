import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { message, Select, Skeleton } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

import { dictionaryApi } from "../utils/apiRoutes";

const MeaningFinder = ({ selectedFile }) => {
  const analysisData = useSelector((state) => state.analytics.analysisData);
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const fileData = analysisData[selectedFile];
    if (!fileData) {
      return;
    }
    const words = Object.keys(fileData);
    setWords(words);
    setDefinition(null);
    setSelectedWord(null);
  }, [selectedFile, analysisData]);

  const fetchMeaning = async (word) => {
    setDefinition(null);
    setLoading(true);
    const response = await axios.get(dictionaryApi + word);
    setLoading(false);
    if (response.status !== 200) {
      return message.error("Failed to fetch meaning");
    }
    const { def } = response.data;
    if (!def.length) {
      return message.error("Sorry, no synonym found for this word :(");
    }
    setDefinition(def);
  };

  const onChange = (value) => {
    setSelectedWord(value);
    fetchMeaning(value);
  };

  return (
    <Container>
      <h3>Find the synonym of a word</h3>
      <Select
        className="word-select"
        showSearch
        placeholder="Select or start typing a word"
        onChange={onChange}
        options={words.map((word) => ({ value: word, label: word }))}
        value={selectedWord}
      />
      {loading && (
        <Skeleton style={{ marginTop: "1rem" }} active size="small" />
      )}
      {definition && (
        <div className="word-definition">
          <h3>
            {definition[0].text}{" "}
            <span style={{ fontStyle: "italic" }}>({definition[0].pos})</span>
          </h3>
          <p>{definition[0].tr[0].text}</p>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .word-select {
    width: 100%;
  }
  .word-definition {
    margin-top: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 1rem;
    h3 {
      font-size: 1.5rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 1.5rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export default MeaningFinder;
