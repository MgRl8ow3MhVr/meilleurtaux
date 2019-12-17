import React from "react";
import { Link } from "react-router-dom";

const ChoiceBox = ({ name, chosen, checked, next }) => {
  return (
    <Link
      to={next}
      onClick={chosen}
      className={checked ? "choicebox selected" : "choicebox"}
    >
      <input type="radio" checked={checked} readOnly />
      <div>{name.toUpperCase()}</div>
    </Link>
  );
};

export default ChoiceBox;
