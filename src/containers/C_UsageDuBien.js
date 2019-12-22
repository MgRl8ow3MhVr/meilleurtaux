import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import ok from "../assets/sounds/ok.mp3";

const UsageDuBien = ({ MT, setMT }) => {
  //Save the current page on landing.
  if (MT.currPage !== "/usageDuBien") {
    setMT({ ...MT, currPage: "/usageDuBien" });
  }
  // load sound to be played on next button
  const okSound = new Audio(ok);

  return (
    <div className="page">
      <div className="title">
        <h1>USAGE DU BIEN</h1>
        <img src={Info} height="25px" alt="i" />
      </div>
      <div className="choicecontenair">
        <ChoiceBox
          name="résidence principale"
          chosen={() => {
            setMT({ ...MT, usage: "residence_principale", moveRight: true });
            okSound.play();
          }}
          checked={MT.usage === "residence_principale"}
          next="/situationActuelle"
        />
        <ChoiceBox
          name="résidence secondaire"
          chosen={() => {
            setMT({ ...MT, usage: "residence_secondaire", moveRight: true });
            okSound.play();
          }}
          checked={MT.usage === "residence_secondaire"}
          next="/situationActuelle"
        />
        <ChoiceBox
          name="investissement locatif"
          chosen={() => {
            setMT({ ...MT, usage: "investissement_locatif", moveRight: true });
            okSound.play();
          }}
          checked={MT.usage === "investissement_locatif"}
          next="/situationActuelle"
        />
      </div>
      <Navigation
        prev="/etatDuBien"
        next="/situationActuelle"
        next_allowed={MT.usage ? true : false}
        percent={30}
        sound={okSound}
        // Passing MT to define percentage bar moving direction as a global value
        MT={MT}
        setMT={setMT}
      />
    </div>
  );
};

export default UsageDuBien;
