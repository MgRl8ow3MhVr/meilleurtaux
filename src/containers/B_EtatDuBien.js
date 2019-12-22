import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import oui from "../assets/sounds/oui.mp3";

const EtatDuBien = ({ MT, setMT }) => {
  //Save the current page
  if (MT.currPage !== "/etatDuBien") {
    setMT({ ...MT, currPage: "/etatDuBien" });
  }
  // load sound to be played on next button
  const ouiSound = new Audio(oui);

  return (
    <div className="page">
      <div className="title">
        <h1>ETAT DU BIEN</h1>
        <img src={Info} height="25px" alt="i" />
      </div>
      <div className="choicecontenair">
        <ChoiceBox
          name="ancien"
          chosen={() => {
            setMT({ ...MT, etat: "ancien", moveRight: true });
            ouiSound.play();
          }}
          checked={MT.etat === "ancien"}
          next="/usageDuBien"
        />
        <ChoiceBox
          name="neuf"
          chosen={() => {
            setMT({ ...MT, etat: "neuf", moveRight: true });
            ouiSound.play();
          }}
          checked={MT.etat === "neuf"}
          next="/usageDuBien"
        />
      </div>
      <Navigation
        prev="/typeDeBien"
        next="/usageDuBien"
        next_allowed={MT.etat ? true : false}
        percent={15}
        sound={ouiSound}
        // Passing MT to define percentage bar moving direction as a global value
        MT={MT}
        setMT={setMT}
      />
    </div>
  );
};

export default EtatDuBien;
