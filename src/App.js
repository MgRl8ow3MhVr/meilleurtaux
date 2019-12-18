// Packages import
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "js-cookie";

// Import Containers
import TypeDeBien from "./containers/A_TypeDeBien";
import EtatDuBien from "./containers/B_EtatDuBien";
import UsageDuBien from "./containers/C_UsageDuBien";
import SituationActuelle from "./containers/D_SituationActuelle";
import OuSeSitue from "./containers/E_OuSeSitue";
import MontantProjet from "./containers/F_MontantProjet";

// Import Components
import Header from "./components/Header";

const App = () => {
  //Global state definition. Init to first page
  const [MT, setMT] = useState({ currPage: "/typeDeBien" });
  console.log("MTApp", MT);
  const [loadingCookie, setLoadingCookie] = useState(true);

  // Cookie Handling - Only on fisrt landing
  // if doesn't exist then create it empty (first time)
  // if it exists, set the MT state with its content
  useEffect(() => {
    const fetchCookie = async () => {
      console.log("fech Cookie");
      const cookie = await Cookies.get("meilleurtaux");
      if (!cookie) {
        await Cookies.set("meilleurtaux", JSON.stringify(MT));
      } else {
        setMT(JSON.parse(cookie));
      }
      setLoadingCookie(false);
    };
    fetchCookie();
  }, []);

  // update Cookie everytime MT is modified
  // console.log("cookieModif", JSON.parse(Cookies.get("meilleurtaux")));
  useEffect(() => {
    Cookies.set("meilleurtaux", JSON.stringify(MT));
  }, [MT]);

  return (
    <>
      {!loadingCookie && (
        <Router>
          <Header />
          <Switch>
            {/* # # # # # # # A - TYPE DE BIEN # # # # # ## */}
            <Route path="/typeDeBien">
              <TypeDeBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # B - ETAT DU BIEN # # # # # ## */}
            <Route path="/etatDuBien">
              <EtatDuBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # C - USAGE DU BIEN # # # # # ## */}
            <Route path="/usageDuBien">
              <UsageDuBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # D - SITUATION ACTUELLE # # # # # ## */}
            <Route path="/situationActuelle">
              <SituationActuelle MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # E - OU SE SITUE # # # # # ## */}
            <Route path="/ouSeSitue">
              <OuSeSitue MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # F - MONTANT PROJET # # # # # ## */}
            <Route path="/montantProjet">
              <MontantProjet MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # DEFAULT ROUTE REDIRECTS TO CURRENT PAGE  # # # # # ## */}
            <Route path="/">
              <Redirect from="/" to={MT.currPage} />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
