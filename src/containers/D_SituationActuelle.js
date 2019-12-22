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
            setMT({ ...MT, situation: "locataire", moveRight: true });
            daccordSound.play();
          }}
          checked={MT.situation === "locataire"}
          next="/ouSeSitue"
        />
        <ChoiceBox
          name="propriétaire"
          chosen={() => {
            setMT({ ...MT, situation: "proprietaire", moveRight: true });
            daccordSound.play();
          }}
          checked={MT.situation === "proprietaire"}
          next="/ouSeSitue"
        />

        <ChoiceBox
          name="bénéficiaire d'un logement de fonction"
          chosen={() => {
            setMT({ ...MT, situation: "beneficiaire", moveRight: true });
            daccordSound.play();
          }}
          checked={MT.situation === "beneficiaire"}
          next="/ouSeSitue"
        />
        <ChoiceBox
          name="hébergé à titre gratuit"
          chosen={() => {
            setMT({ ...MT, situation: "heberge", moveRight: true });
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
        // Passing MT to define percentage bar moving direction as a global value
        MT={MT}
        setMT={setMT}
      />
    </div>
  );
};

export default SituationActuelle;
