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
            setMT({ ...MT, etat: "ancien" });
            ouiSound.play();
          }}
          checked={MT.etat === "ancien"}
          next="/usageDuBien"
        />
        <ChoiceBox
          name="neuf"
          chosen={() => {
            setMT({ ...MT, etat: "neuf" });
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
      />
    </div>
  );
};

export default EtatDuBien;
