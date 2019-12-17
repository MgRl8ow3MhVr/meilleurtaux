import React from "react";
import { Link } from "react-router-dom";
import PercentageBar from "./PercentageBar";

const Navigation = ({ prev, next, next_allowed, percent }) => {
  return (
    <div className="navigation">
      <div className="navbar">
        <Link to={prev}>
          <div className="precedent">PRECEDENT</div>
        </Link>

        <PercentageBar percent={percent} />

        {next_allowed ? (
          <Link to={next}>
            <div className="suivant">SUIVANT</div>
          </Link>
        ) : (
          <div
            className="suivant"
            onClick={() => {
              alert("nope");
            }}
          >
            SUIVANT
          </div>
        )}
      </div>
      <span>*Champ obligatoire - </span>
      <span className="underlined">mentions légales</span>
    </div>
  );
};

export default Navigation;
