import React from "react";
import logo from "../assets/meilleurtaux.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <img src={logo} alt="logo" />
          <div> Crédit immobilier : 5mn pour obtenir le meilleur taux</div>
        </div>
        <Link to="/Admin" className="adminbutton">
          Admin
        </Link>
      </div>
    </header>
  );
};

export default Header;
