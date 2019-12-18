import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";

const MontantProjet = ({ MT, setMT }) => {
  const [acquisition, setAcquisition] = useState(MT.acquisition);
  const [travaux, setTravaux] = useState(MT.travaux);

  const notaire = num => {
    if (MT.etat === "neuf") {
      return Math.floor(0.018 * Number(num));
    } else {
      return Math.floor(0.0738 * Number(num));
    }
  };

  //Save the current page on landing.
  if (MT.currPage !== "/montantProjet") {
    setMT({ ...MT, currPage: "/montantProjet" });
  }

  return (
    <div className="page">
      <div className="title">
        <h1>définissons le montant de votre projet</h1>
      </div>
      {/* # # # # # # INPUT ACQUISITION # # # # # # # # # # # # #  */}
      <div className="inputbar grey">
        <h2>Montant estimé de votre acquisition*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          type="text"
          value={acquisition}
          onChange={event => {
            if (!isNaN(event.target.value)) {
              const val = Number(event.target.value);
              setAcquisition(val);
              setMT({ ...MT, acquisition: val });
            }
          }}
          onClick={() => {
            setAcquisition("");
            setMT({ ...MT, acquisition: null });
          }}
        />
        €
      </div>
      {/* # # # # # # INPUT TRAVAUX # # # # # # # # # # # # #  */}
      <div className="inputbar">
        <h2>Montant estimé des travaux*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          type="text"
          value={travaux}
          onChange={event => {
            !isNaN(event.target.value) &&
              setTravaux(Number(event.target.value));
            setMT({ ...MT, travaux: Number(event.target.value) });
          }}
        />
        €
      </div>
      {/* # # # # # # INPUT NOTAIRE # # # # # # # # # # # # #  */}
      <div className="inputbar grey">
        <h2>Frais de notaire*</h2>
        <img src={Info} height="18px" alt="i" />
        <input value={acquisition && notaire(acquisition)} />€
      </div>
      {/* # # # # # # INPUT TOTAL # # # # # # # # # # # # #  */}
      <div className="inputbar">
        <h2>Budget total estimé du projet*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          type="text"
          value={
            acquisition &&
            acquisition + (travaux ? travaux : 0) + notaire(acquisition)
          }
        />
        €
      </div>

      {/* # # # # # # NAV BAR BOTTOM # # # # # # # # # # # # #  */}
      <Navigation
        prev="/ouSeSitue"
        next="/montantProjet"
        next_allowed={MT.acquisition ? true : false}
        percent={75}
      />
    </div>
  );
};

export default MontantProjet;
