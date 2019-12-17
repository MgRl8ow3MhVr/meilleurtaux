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
            {/* # # # # # # # 1 TYPE DE BIEN # # # # # ## */}
            <Route path="/typeDeBien">
              <TypeDeBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # 2 ETAT DU BIEN # # # # # ## */}
            <Route path="/etatDuBien">
              <EtatDuBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # 3 USAGE DU BIEN # # # # # ## */}
            <Route path="/usageDuBien">
              <UsageDuBien MT={MT} setMT={setMT} />
            </Route>
            {/* # # # # # # # 4 SITUATION ACTUELLE # # # # # ## */}
            <Route path="/situationActuelle">
              <SituationActuelle MT={MT} setMT={setMT} />
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
