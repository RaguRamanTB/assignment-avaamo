import React, { useState } from "react";
import styled from "styled-components";
import { Steps } from "antd";

const FileSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

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
    console.log("onChange:", value);
    setCurrentStep(value);
  };

  return (
    <Container>
      <Steps
        className="steps"
        size="small"
        current={currentStep}
        onChange={onStepChange}
        percent={stepProgress}
        direction="vertical"
        items={items}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  .steps {
    padding: 1rem;
  }
`;

export default FileSteps;
