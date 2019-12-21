import React from "react";
import { Link } from "react-router-dom";
import radio_button_checked from "../assets/radio_button_checked.svg";
import radio_button_unchecked from "../assets/radio_button_unchecked.svg";

// CHOICE BOXES FROM FIRST 4 PAGES

const ChoiceBox = ({ name, chosen, checked, next }) => {
  return (
    <Link
      to={next}
      onClick={chosen}
      className={checked ? "choicebox selected" : "choicebox"}
    >
      {/* <input type="radio" checked={checked} readOnly /> */}
      <img src={checked ?radio_button_checked:radio_button_unchecked} />
      <div style={{ color: checked && "white" }}>{name.toUpperCase()}</div>
    </Link>
  );
};

export default ChoiceBox;
