import React, { useState } from "react";
import Navigation from "../components/Navigation";
import CityList from "../components/CityList";
import Info from "../assets/infos.png";
import yes from "../assets/sounds/yes.mp3";

const countries = ["FRANCE", "ALLEMAGNE", "BELGIQUE", "ITALIE", "AUTRE PAYS"];

const OuSeSitue = ({ MT, setMT }) => {
  // initialize country to what's in the global state otherwise France by default
  const initcountry = MT.ouSeSitue ? MT.ouSeSitue.country : "FRANCE";
  const initcity = MT.zip && MT.city ? `${MT.city} (${MT.zip})` : null;
  const [country, setCountry] = useState(initcountry);
  const [citySearch, setCitySearch] = useState(initcity);
  const [searchOpen, setSearchOpen] = useState(false);

  const yesSound = new Audio(yes);

  //Save the current page on landing.
  if (MT.currPage !== "/ouSeSitue") {
    setMT({ ...MT, currPage: "/ouSeSitue" });
  }

  return (
    <div className="page">
      <div className="title">
        <h1>OU SE SITUE LE BIEN A FINANCER ?</h1>
      </div>
      {/* # # # # # # INPUT COUNTRY # # # # # # # # # # # # #  */}
      <div className="inputbar grey">
        <h2>Dans quel pays se situe votre projet ?*</h2>
        <img src={Info} height="18px" alt="i" />
        <select
          className="OuInput"
          value={country}
          onChange={event => {
            setCountry(event.target.value);
            setMT({
              ...MT,
              country: event.target.value
            });
          }}
        >
          {countries.map(country => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      </div>

      {/* # # # # # # INPUT ZIPCODE # # # # # # # # # # # # #  */}
      <div className="inputbar">
        <h2>Ville ou Code postal ?*</h2>
        <img src={Info} height="18px" alt="i" />
        <div className="cityinput">
          <input
            className="OuInput"
            type="text"
            value={citySearch}
            placeholder="ex:10300"
            onChange={event => {
              setSearchOpen(true);
              setCitySearch(event.target.value);
            }}
            onClick={() => {
              setCitySearch("");
              setMT({
                ...MT,
                zip: null,
                city: null
              });
            }}
          />
          {searchOpen && citySearch && (
            <CityList
              input={citySearch}
              click={(city, zip) => {
                return () => {
                  setCitySearch(`${city} (${zip})`);
                  setSearchOpen(false);
                  setMT({
                    ...MT,
                    city: city,
                    zip: zip,
                    country: country
                  });
                };
              }}
            />
          )}
        </div>
      </div>
      <span>
        La connaissance du code postal du bien permettra de calculer les frais
        de notaire selon les conditions en vigueur dans le département concerné.
        Si vous êtes en recherche de bien sur plusieurs communes, indiquez une
        commune ciblée
      </span>

      {/* # # # # # # NAV BAR BOTTOM # # # # # # # # # # # # #  */}
      <Navigation
        prev="/situationActuelle"
        next="/montantProjet"
        next_allowed={MT.zip && MT.country && MT.city}
        percent={60}
        sound={yesSound}
      />
    </div>
  );
};

export default OuSeSitue;
