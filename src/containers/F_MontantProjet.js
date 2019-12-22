import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import sound from "../assets/sounds/yesfort.mp3";

const MontantProjet = ({ MT, setMT }) => {
  const [acquisition, setAcquisition] = useState(MT.acquisition);
  const [travaux, setTravaux] = useState(MT.travaux);

  //Loading Sound to be played on Next
  const TheSound = new Audio(sound);
  TheSound.volume = 0.3;

  //Calculation of Notaire fees depending on Etat
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
          className="priceinput orangeborder"
          type="text"
          value={acquisition}
          onChange={event => {
            // Allowing only Numbers
            if (!isNaN(event.target.value)) {
              const val = Number(event.target.value);
              setAcquisition(val);
              setMT({ ...MT, acquisition: val });
            }
          }}
          //On Click, reset it all
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
          className="priceinput orangeborder"
          type="text"
          value={travaux}
          onChange={event => {
            //allowing only numbers
            !isNaN(event.target.value) &&
              setTravaux(Number(event.target.value));
            setMT({ ...MT, travaux: Number(event.target.value) });
          }}
        />
        €
      </div>
      {/* # # # # # # INPUT NOTAIRE - read Only # # # # # # # # # # # # #  */}
      <div className="inputbar grey">
        <h2>Frais de notaire*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          className="priceinput orangeborder"
          readOnly
          value={acquisition && notaire(acquisition)}
        />
        €
      </div>
      {/* # # # # # # INPUT TOTAL - read Only # # # # # # # # # # # # #  */}
      <div className="inputbar">
        <h2>Budget total estimé du projet*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          className="priceinput greyborder"
          readOnly
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
        next="/coordonnees"
        next_allowed={MT.acquisition ? true : false}
        percent={75}
        sound={TheSound}
        // Passing MT to define percentage bar moving direction as a global value
        MT={MT}
        setMT={setMT}
      />
    </div>
  );
};

export default MontantProjet;
