import React, { useState, useEffect } from "react";
import AdminListDevis from "../components/AdminListDevis";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BackEndAddress from "../components/BackEndAddress";

const Admin = () => {
  const [token, setToken] = useState();
  const [password, setPassword] = useState();
  const [ms, setMs] = useState();

  const sendPassword = async password => {
    try {
      const response = await axios.post(BackEndAddress + "/authent", {
        password: password
      });
      const tok = response.data.token;
      if (tok) {
        setToken(tok);
        Cookies.set("token", { tok: tok, ms: ms });
      } else {
        alert("mauvais mot de passe");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const unlog = () => {
    setToken(null);
    setMs(null);
    setPassword(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    const fetchCookie = async () => {
      let cookie = await Cookies.get("token");

      if (cookie) {
        cookie = JSON.parse(cookie);
        setToken(cookie.tok);
        setMs(cookie.ms);
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
        <AdminListDevis token={token} unlog={unlog} ms={ms} />
      ) : (
        <div className="authent">
          <img
            src="https://www.bm-lyon.fr/expo/virtuelles/chaperon/gravure2.jpg"
            alt="bobinette"
          />
          <form
            onSubmit={event => {
              event.preventDefault();
              if (ms) {
                if (Number(ms) > 19 && Number(ms) < 3000) {
                  sendPassword(password);
                } else {
                  alert("on a dit entre 20 et 3000");
                }
              } else {
                alert("vous avez oublié les millisecondes");
              }
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
            <input
              type="text"
              placeHolder="tapez un chiffre entre 20 et 3000 (millisecondes)"
              value={ms}
              onChange={event => {
                setMs(event.target.value);
              }}
            />
            <input
              // style={{ backgroundColor: "red" }}
              type="submit"
              value="Tire la chevillette et la bobinette cherra"
            />
          </form>
        </div>
      )}
    </>
  );
};
export default Admin;
