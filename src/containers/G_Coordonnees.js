import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import axios from "axios";

import Info from "../assets/infos.png";
import visuel from "../assets/visuel-desktop-email.jpg";

const Coordonnees = ({ MT, setMT, setFinalId }) => {
  const [email, setEmail] = useState(MT.email ? MT.email : null);
  const [accept, setAccept] = useState(MT.acceptemail);
  const [id, setID] = useState();

  const UploadDatas = async () => {
    try {
      const response = await axios.post("http://localhost:3100/deviscreation", {
        email: MT.email,
        type: MT.type,
        etat: MT.etat,
        usage: MT.usage,
        situation: MT.situation,
        montant: MT.acquisition + (MT.travaux ? MT.travaux : 0),
        zip: MT.zip
      });
      console.log("reponse server");
      console.log(response.data);
      console.log("from upoad data", response.data.id);
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
      />
    </div>
  );
};

export default Coordonnees;
