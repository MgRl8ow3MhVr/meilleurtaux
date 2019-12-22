import React, { useState } from "react";
import { Link } from "react-router-dom";
import PercentageBar from "./PercentageBar";
import mauvais from "../assets/sounds/mauvais.mp3";
import nanana from "../assets/sounds/nanana.mp3";

//AJOUTER MESSAGE D ERREUR

const Navigation = ({
  prev,
  next,
  next_allowed,
  percent,
  valider,
  sound,
  MT,
  setMT
}) => {
  //Sound to be played only when returning to Start page
  const mauvaisSound = new Audio(mauvais);
  //Sound to be played in any case of "not Allowed to go to next page"
  const nananaSound = new Audio(nanana);
  nananaSound.volume = 0.2;

  return (
    <div className="navigation">
      <div className="navbar">
        {/* # # # # # # # # PREVIOUS PAGE Button # # # # # # # # # */}
        <Link to={prev}>
          <div
            className="precedent"
            onClick={() => {
              //adding to MT global state the direction
              setMT({ ...MT, moveRight: false });
              if (prev === "/typeDeBien") {
                mauvaisSound.play();
              }
            }}
          >
            PRECEDENT
          </div>
        </Link>
        {/* # # # # # # # # PERCENTAGE BAR  # # # # # # # # # */}
        {/* {setIsready && ( */}
        <PercentageBar percent={percent} MT={MT} />
        {/* )} */}

        {next_allowed ? (
          // {/* # # # # # # # # BUTTON NEXT IF ALLOWED TO  # # # # # # # # # */}
          <Link to={next}>
            <div
              className="suivant"
              onClick={() => {
                setMT({ ...MT, moveRight: true });
                sound.play();
                if (valider) {
                  valider();
                }
              }}
            >
              {valider ? "VALIDER" : "SUIVANT"}
            </div>
          </Link>
        ) : (
          // {/* # # # # # # # # BUTTON NEXT IF NOT ALLOWED TO  # # # # # # # # # */}
          <div
            className="suivant"
            onClick={() => {
              setMT({ ...MT, moveRight: true });
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
