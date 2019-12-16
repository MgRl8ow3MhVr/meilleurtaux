import React from "react";
import { Link } from "react-router-dom";
import ChoiceBox from "../components/ChoiceBox";

const EtatDuBien = () => {
  return (
    <>
      <h1>Etat Du Bien</h1>
      <div className="choicecontenair">
        <ChoiceBox name="ANCIEN"></ChoiceBox>
        <ChoiceBox name="NEUF"></ChoiceBox>
      </div>
    </>
  );
};

export default EtatDuBien;
