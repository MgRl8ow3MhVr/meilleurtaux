// Packages import
import React, { useState, useEffect } from "react";
import "./App.css";
// import {  } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

// Import Containers
import TypeDeBien from "./containers/TypeDeBien";
import EtatDuBien from "./containers/EtatDuBien";
import UsageDuBien from "./containers/UsageDuBien";

// Import Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";

// This table contains the navigation order - to be used by "suivant" and "precedent" buttons
const nav = [
  "/typeDeBien",
  "/etatDuBien",
  "/usageDuBien",
  "/situationActuelle",
  "/ouSeSitueLeBien"
];

function App() {
  //Global state definition. Init to first page
  const [MT, setMT] = useState({ currPage: 0 });
  const [prevNext, setPrevNext] = useState();
  console.log("MTApp", MT);

  //To be passed to Navigation and buttons
  const setNext = x => {
    let newpage = MT.currPage + x;
    if (newpage > -1) {
      setMT({ ...MT, currPage: newpage });
    }
  };

  // Updating Next and Previous pages everytime MT changes
  useEffect(() => {
    const currentPage = MT.currPage;
    if (!currentPage) {
      setPrevNext([nav[0], nav[1]]);
    } else {
      setPrevNext([nav[currentPage - 1], nav[currentPage + 1]]);
    }
  }, [MT]);

  //Cookie Handling - Only on page opening
  //if doesn't exist then create it empty (first time)
  // if it exists, set the MT state with its content
  useEffect(() => {
    // const history = useHistory();

    const cookie = Cookies.get("meilleurtaux");
    console.log("cookie is", cookie);
    if (!cookie) {
      Cookies.set("meilleurtaux", MT);
    } else {
      // setMT(JSON.parse(cookie));
    }
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        {/* # # # # # # # TYPE DE BIEN # # # # # ## */}
        <Route path="/typeDeBien">
          <TypeDeBien
            chosen={type => {
              setMT({ ...MT, type: type });
            }}
            currentType={MT.type}
          />
        </Route>
        {/* # # # # # # # ETAT DU BIEN # # # # # ## */}
        <Route path="/etatDuBien">
          <EtatDuBien />
        </Route>
        {/* # # # # # # # ETAT DU BIEN # # # # # ## */}
        <Route path="/usageDuBien">
          <UsageDuBien />
        </Route>
        {/* # # # # # # # DEFAULT ROUTE REDIRECTS TO CURRENT PAGE  # # # # # ## */}
        <Route path="/">
          <Redirect from="/" to={MT.currPage ? MT.currPage : "typeDeBien"} />
        </Route>
      </Switch>
      <Navigation prevNext={prevNext} setnext={setNext} />
    </Router>
  );
}

export default App;
