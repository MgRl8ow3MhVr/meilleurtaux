import React from "react";
import ChoiceBox from "../components/ChoiceBox";
import Navigation from "../components/Navigation";
import Info from "../assets/Info";

const UsageDuBien = ({ MT, setMT }) => {
  //Save the current page on landing.
  if (MT.currPage !== "/usageDuBien") {
    setMT({ ...MT, currPage: "/usageDuBien" });
  }

  return (
    <div className="page">
      <h1>USAGE DU BIEN</h1>
      <Info />
      <div className="choicecontenair">
        <ChoiceBox
          name="résidence principale"
          chosen={() => {
            setMT({ ...MT, usage: "residence_principale" });
          }}
          checked={MT.usage === "residence_principale"}
          next="/situationActuelle"
        />
        <ChoiceBox
          name="résidence secondaire"
          chosen={() => {
            setMT({ ...MT, usage: "residence_secondaire" });
          }}
          checked={MT.usage === "residence_secondaire"}
          next="/situationActuelle"
        />
        <ChoiceBox
          name="investissement locatif"
          chosen={() => {
            setMT({ ...MT, usage: "investissement_locatif" });
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
      />
    </div>
  );
};

export default UsageDuBien;
