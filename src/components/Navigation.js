import React from "react";
import { Link } from "react-router-dom";
import PercentageBar from "./PercentageBar";
import mhmh from "../assets/sounds/mhmh.mp3";
import nanana from "../assets/sounds/nanana.mp3";
import goodboy from "../assets/sounds/goodboy.mp3";
import mauvais from "../assets/sounds/mauvais.mp3";

//AJOUTER MESSAGE D ERREUR

const Navigation = ({ prev, next, next_allowed, percent, valider }) => {
  const nananaSound = new Audio(nanana);
  const mhmhSound = new Audio(mhmh);
  const goodboySound = new Audio(goodboy);
  const mauvaisSound = new Audio(mauvais);

  return (
    <div className="navigation">
      <div className="navbar">
        <Link to={prev}>
          <div
            className="precedent"
            onClick={() => {
              mauvaisSound.play();
            }}
          >
            PRECEDENT
          </div>
        </Link>

        <PercentageBar percent={percent} />

        {next_allowed ? (
          <Link to={next}>
            <div
              className="suivant"
              onClick={() => {
                if (valider) {
                  goodboySound.play();
                  valider();
                } else {
                  mhmhSound.play();
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
              nananaSound.play();
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
