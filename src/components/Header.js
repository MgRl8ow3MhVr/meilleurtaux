import React from "react";
import logo from "../assets/meilleurtaux.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />
        <Link
          to="/Admin"
          style={{
            backgroundColor: "grey",
            border: "solid 1px",
            fontSize: "10px"
          }}
        >
          Admin
        </Link>
      </div>
      <div> Crédit immobilier : 5mn pour obtenir le meilleur taux</div>
      <hr />
    </header>
  );
};

export default Header;
