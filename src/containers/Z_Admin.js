import React, { useState, useEffect } from "react";
import AdminListDevis from "../components/AdminListDevis";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BackEndAddress from "../components/BackEndAddress";

const Admin = () => {
  const [token, setToken] = useState();
  const [password, setPassword] = useState();

  const sendPassword = async password => {
    try {
      const response = await axios.post(BackEndAddress + "/authent", {
        password: password
      });
      const tok = response.data.token;
      if (tok) {
        setToken(tok);
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

  const unlog = () => {
    setToken(null);
    setPassword(null);
    Cookies.remove("token");
  };

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
        <AdminListDevis token={token} unlog={unlog} />
      ) : (
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
