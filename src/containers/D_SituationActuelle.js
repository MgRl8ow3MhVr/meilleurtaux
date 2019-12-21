import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import daccord from "../assets/sounds/mhmh.mp3";

const SituationActuelle = ({ MT, setMT }) => {
  //Save the current page on landing.
  // if statement otherwise infinite loop
  if (MT.currPage !== "/situationActuelle") {
    setMT({ ...MT, currPage: "/situationActuelle" });
  }

  const daccordSound = new Audio(daccord);

  return (
    <div className="page">
      <div className="title">
        <h1>VOTRE SITUATION ACTUELLE</h1>
        <img src={Info} height="25px" alt="i" />
      </div>
      <div className="choicecontenair">
        <ChoiceBox
          name="locataire"
          chosen={() => {
            setMT({ ...MT, situation: "locataire" });
            daccordSound.play();
          }}
          checked={MT.situation === "locataire"}
          next="/ouSeSitue"
        />
        <ChoiceBox
          name="propriétaire"
          chosen={() => {
            setMT({ ...MT, situation: "proprietaire" });
            daccordSound.play();
          }}
          checked={MT.situation === "proprietaire"}
          next="/ouSeSitue"
        />

        <ChoiceBox
          name="bénéficiaire d'un logement de fonction"
          chosen={() => {
            setMT({ ...MT, situation: "beneficiaire" });
            daccordSound.play();
          }}
          checked={MT.situation === "beneficiaire"}
          next="/ouSeSitue"
        />
        <ChoiceBox
          name="hébergé à titre gratuit"
          chosen={() => {
            setMT({ ...MT, situation: "heberge" });
            daccordSound.play();
          }}
          checked={MT.situation === "heberge"}
          next="/ouSeSitue"
        />
      </div>
      <Navigation
        prev="/usageDuBien"
        next="/ouSeSitue"
        next_allowed={MT.situation ? true : false}
        percent={45}
        sound={daccordSound}
      />
    </div>
  );
};

export default SituationActuelle;
