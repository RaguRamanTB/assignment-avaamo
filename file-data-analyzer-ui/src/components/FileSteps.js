import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Steps } from "antd";

import { setCurrentStep } from "../reducers/stepSlice";

const FileSteps = () => {
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();

  const items = [
    {
      title: "Upload",
      description: "Upload your files for analysis and masking",
    },
    {
      title: "Analyzer",
      description: "View your file data analysis",
    },
    {
      title: "Masker",
      description: "Mask words in your file and get your output",
    },
  ];

  const onStepChange = (value) => {
    dispatch(setCurrentStep(value));
  };

  return (
    <Container>
      <Steps
        className="steps"
        current={step.currentStep}
        onChange={onStepChange}
        percent={step.stepProgress}
        direction="vertical"
        items={items}
      />
    </Container>
  );
};

const Container = styled.div`
  .steps {
    padding: 1rem;
    .ant-steps-item-title {
      font-weight: 700;
    }
  }
`;

export default FileSteps;
