import React from "react";
import ChoiceBox from "../components/ChoiceBox";

const UsageDuBien = () => {
  return (
    <>
      <h1>Usage Du Bien</h1>
      <div className="choicecontenair">
        <ChoiceBox name="RESID PRINCIPALE"></ChoiceBox>
        <ChoiceBox name="RESID SECONAIRE"></ChoiceBox>
        <ChoiceBox name="INVESTISSMENT LOCATIF"></ChoiceBox>
      </div>
    </>
  );
};

export default UsageDuBien;
