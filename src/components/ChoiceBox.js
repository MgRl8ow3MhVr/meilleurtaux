import React from "react";
import { Link } from "react-router-dom";

const ChoiceBox = ({ name, chosen, checked, next }) => {
  return (
    <Link to={next} className={checked ? "choicebox orange" : "choicebox"}>
      <div
        onClick={() => {
          chosen(name);
        }}
      >
        <input type="radio" checked={checked} readOnly />
        {name}
      </div>
    </Link>
  );
};

export default ChoiceBox;
