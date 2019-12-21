import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import mhmh from "../assets/sounds/mhmh.mp3";
const TypeDeBien = ({ MT, setMT }) => {
  //Save the current page on landing.
  // if statement otherwise infinite loop
  if (MT.currPage !== "/typeDeBien") {
    setMT({ ...MT, currPage: "/typeDeBien" });
  }

  // load sound to be played on next button
  const mhmhSound = new Audio(mhmh);

  return (
    <div className="page">
      <div className="title">
        <h1>TYPE DE BIEN</h1>
        <img src={Info} height="25px" alt="i" />
      </div>
      <div className="choicecontenair">
        <ChoiceBox
          name="maison"
          chosen={() => {
            setMT({ ...MT, type: "maison" });
            mhmhSound.play();
          }}
          checked={MT.type === "maison"}
          next="/etatDuBien"
        />
        <ChoiceBox
          name="appartement"
          chosen={() => {
            setMT({ ...MT, type: "appartement" });
            mhmhSound.play();
          }}
          checked={MT.type === "appartement"}
          next="/etatDuBien"
        />
      </div>
      <Navigation
        prev="/typeDeBien"
        next="/etatDuBien"
        next_allowed={MT.type ? true : false}
        percent={0}
        sound={mhmhSound}
      />
    </div>
  );
};

export default TypeDeBien;
