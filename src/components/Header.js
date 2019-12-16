import React from "react";
// import logo from "../assets/logo-mtx.jpg";
import logo from "../assets/meilleurtaux.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <div> Crédit immobilier : 5mn pour obtenir le meilleur taux</div>
      <hr />
    </header>
  );
};

export default Header;
