import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/Info";

const TypeDeBien = ({ MT, setMT }) => {
  //Save the current page on landing.
  // if statement otherwise infinite loop
  if (MT.currPage !== "/typeDeBien") {
    setMT({ ...MT, currPage: "/typeDeBien" });
  }

  return (
    <div className="page">
      <h1>TYPE DE BIEN</h1>
      <Info />
      <div className="choicecontenair">
        <ChoiceBox
          name="maison"
          chosen={() => {
            setMT({ ...MT, type: "maison" });
          }}
          checked={MT.type === "maison"}
          next="/etatDuBien"
        />
        <ChoiceBox
          name="appartement"
          chosen={() => {
            setMT({ ...MT, type: "appartement" });
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
      />
    </div>
  );
};

export default TypeDeBien;
