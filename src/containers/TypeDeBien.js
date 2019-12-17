import React from "react";
import ChoiceBox from "../components/ChoiceBox";

const TypeDeBien = ({ chosen, currentType }) => {
  return (
    <>
      <h1>TYPE DE BIEN</h1>
      <div className="choicecontenair">
        <ChoiceBox
          name="maison"
          chosen={chosen}
          checked={currentType === "maison"}
          next="/usageDuBien"
        />
        <ChoiceBox
          name="appartement"
          chosen={chosen}
          checked={currentType === "appartement"}
        />
      </div>
    </>
  );
};

export default TypeDeBien;
