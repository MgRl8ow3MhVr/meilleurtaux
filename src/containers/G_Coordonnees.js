import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import axios from "axios";
import BackEndAddress from "../components/BackEndAddress";
import goodboy from "../assets/sounds/goodboydelay.mp3";
import allez from "../assets/sounds/allez.mp3";

import Info from "../assets/infos.png";
import visuel from "../assets/visuel-desktop-email.jpg";

const Coordonnees = ({ MT, setMT, setFinalId }) => {
  const [email, setEmail] = useState(MT.email ? MT.email : null);
  const [accept, setAccept] = useState(MT.acceptemail);
  const [id, setID] = useState();

  //Load Sound to be played on Valider
  const goodboySound = new Audio(goodboy);
  const allezSound = new Audio(allez);
  allezSound.volume = 0.5;

  // function upload Datas to back Office to be passed on Valider button
  const UploadDatas = async () => {
    try {
      setFinalId(null);
      const response = await axios.post(BackEndAddress + "/deviscreation", {
        email: MT.email,
        type: MT.type,
        etat: MT.etat,
        usage: MT.usage,
        situation: MT.situation,
        montant: MT.acquisition + (MT.travaux ? MT.travaux : 0),
        zip: MT.zip
      });
      console.log("from server", response.data.id);
      // FinaliD is a state passed from App.js so it can be passed to the next page container "Et Voila"
      setFinalId(response.data.id);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      return;
    }
  };
  //Save the current page on landing.
  if (MT.currPage !== "/coordonnees") {
    setMT({ ...MT, currPage: "/coordonnees" });
  }

  return (
    <div className="page">
      <div className="title">
        <h1>vos coordonnées</h1>
      </div>

      {/* # # # # # # VISUAL # # # # # # # # # # # # #  */}
      <div className="visual">
        <div>
          Un devis vous sera envoyé par mail avec un récapitulatif de votre
          demande
        </div>
        <img src={visuel} alt="visual" />
      </div>
      {/* # # # # # # INPUT EMAIL # # # # # # # # # # # # #  */}
      <div className="inputbar grey">
        <h2>Adresse email emprunteur*</h2>
        <img src={Info} height="18px" alt="i" />
        <input
          className="OuInput greyborder"
          type="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
            setMT({ ...MT, email: event.target.value });
          }}
        />
      </div>
      {/* # # # # # # INPUT CHECKBOX # # # # # # # # # # # # #  */}
      <input
        type="checkbox"
        checked={accept}
        onChange={event => {
          !accept && goodboySound.play();
          setAccept(!accept);
          setMT({ ...MT, acceptemail: !accept });
        }}
      />
      <span>
        J'accepte de recevoir par email des propositions de meilleur taux*
      </span>

      {/* # # # # # # NAV BAR BOTTOM # # # # # # # # # # # # #  */}
      <Navigation
        prev="/montantProjet"
        next="/etVoila/"
        next_allowed={email && accept}
        percent={99}
        valider={() => {
          UploadDatas();
          Cookies.remove("meilleurtaux");
          setMT({ currPage: "/typeDeBien" });
        }}
        sound={allezSound}
        // Passing MT to define percentage bar moving direction as a global value
        MT={MT}
        setMT={setMT}
      />
    </div>
  );
};

export default Coordonnees;
