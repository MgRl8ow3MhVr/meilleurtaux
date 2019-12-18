import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Info from "../assets/infos.png";
import visuel from "../assets/visuel-desktop-email.jpg";

const Coordonnees = ({ MT, setMT }) => {
  const [email, setEmail] = useState(MT.email ? MT.email : null);
  const [accept, setAccept] = useState(MT.acceptemail);

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
        next="/etVoila"
        next_allowed={email && accept}
        percent={99}
        valider={() => {
          alert("hello");
        }}
      />
    </div>
  );
};

export default Coordonnees;
