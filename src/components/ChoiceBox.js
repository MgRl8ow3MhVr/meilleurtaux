import React from "react";

const ChoiceBox = ({ name, chosen, checked }) => {
  return (
    <div
      className={checked ? "choicebox orange" : "choicebox"}
      onClick={() => {
        chosen(name);
      }}
    >
      <input type="radio" checked={checked} readOnly />
      {name}
    </div>
  );
};

export default ChoiceBox;
