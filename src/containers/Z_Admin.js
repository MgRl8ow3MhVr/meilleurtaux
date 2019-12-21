import React, { useState, useEffect } from "react";
import AdminListDevis from "../components/AdminListDevis";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BackEndAddress from "../components/BackEndAddress";

const Admin = () => {
  // Token state will receive the token from BackOffice if password sent was correct
  const [token, setToken] = useState();
  // Password State only for the Input Tag
  const [password, setPassword] = useState();

  //Function to send password to backoffice
  const sendPassword = async password => {
    try {
      const response = await axios.post(BackEndAddress + "/authent", {
        password: password
      });
      const tok = response.data.token;
      if (tok) {
        setToken(tok);
        //Set a cookie with the token to avoid log in everytime
        Cookies.set("token", { tok: tok });
      } else {
        alert("mauvais mot de passe");
      }
    } catch (e) {
      console.log(e.message);
      alert(
        "On est pas surs mais on pense que le serveur n est pas atteignable"
      );
    }
  };

  // Function to Log Out, to be passed to the Real ADmin Component "Admin List Devis" when clicking on Log Out button
  const unlog = () => {
    setToken(null);
    setPassword(null);
    Cookies.remove("token");
  };

  // On landing only, check if Token already exists in the Cookie, if yes no need to log in
  useEffect(() => {
    const fetchCookie = async () => {
      let cookie = await Cookies.get("token");

      if (cookie) {
        setToken(cookie);
      }
    };
    fetchCookie();
  }, []);

  return (
    <>
      <Link
        to="/"
        style={{
          backgroundColor: "purple",
          border: "solid 1px",
          color: "white"
        }}
      >
        Retour au Formulaire
      </Link>
      {token ? (
        // # # # # # IF TOKEN IS PRESENT, WE ARE LOGED IN, GO TO ACTUAL ADMIN PAGE  # # # # #
        <AdminListDevis token={token} unlog={unlog} />
      ) : (
        // # # # # # OTHERWISE SHOW LOGIN PAGE  # # # # #
        <div className="authent">
          <img
            src="https://media1.giphy.com/media/K20uJQyNnchq0/source.gif"
            alt="bobinette"
          />
          <form
            onSubmit={event => {
              event.preventDefault();
              sendPassword(password);
            }}
          >
            <input
              type="text"
              value={password}
              placeHolder="mot de passe (indice: vers la lune)"
              onChange={event => {
                setPassword(event.target.value);
              }}
            />

            <input type="submit" value="Are you Ready for This ?" />
          </form>
        </div>
      )}
    </>
  );
};
export default Admin;
