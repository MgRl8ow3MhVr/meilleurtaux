import React from "react";
import Navigation from "../components/Navigation";
import Info from "../assets/Info";

const OuSeSitue = ({ MT, setMT }) => {
  //Save the current page on landing.
  // if statement otherwise infinite loop

  //https://vicopo.selfbuild.fr/cherche/680
  if (MT.currPage !== "/ouSeSitue") {
    setMT({ ...MT, currPage: "/ouSeSitue" });
  }

  return (
    <div className="page">
      <div className="title">
        <h1>OU SE SITUE LE BIEN A FINANCER ?</h1>
      </div>

      <div className="inputbar">
        <h2>Dans quel pays se situe votre projet ?*</h2>
        <Info />
        <input type="text" placeholder="FRANCE" />
      </div>
      <div className="inputbar grey">
        <h2>Dans quel pays se situe votre projet ?*</h2>
        <Info />
        <input type="text" placeholder="FRANCE" />
      </div>

      <Navigation
        prev="/situationActuelle"
        next="/ouSeSitue"
        next_allowed={MT.situation ? true : false}
        percent={60}
      />
    </div>
  );
};

export default OuSeSitue;
