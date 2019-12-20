import React from "react";
import { Link } from "react-router-dom";
import PercentageBar from "./PercentageBar";

//AJOUTER MESSAGE D ERREUR

const Navigation = ({ prev, next, next_allowed, percent, valider }) => {
  return (
    <div className="navigation">
      <div className="navbar">
        <Link to={prev}>
          <div className="precedent">PRECEDENT</div>
        </Link>

        <PercentageBar percent={percent} />

        {next_allowed ? (
          <Link to={next}>
            <div
              className="suivant"
              onClick={() => {
                if (valider) {
                  valider();
                }
              }}
            >
              {valider ? "VALIDER" : "SUIVANT"}
            </div>
          </Link>
        ) : (
          <div
            className="suivant"
            onClick={() => {
              console.log("ICI");
              alert("vous n'avez pas renseigné tous les champs");
            }}
          >
            {valider ? "VALIDER" : "SUIVANT"}
          </div>
        )}
      </div>
      <span>*Champ obligatoire - </span>
      <span className="underlined">mentions légales</span>
    </div>
  );
};

export default Navigation;
