import React, { useState } from "react";
import Navigation from "../components/Navigation";
import CityList from "../components/CityList";
import Info from "../assets/infos.png";

const countries = ["FRANCE", "ALLEMAGNE", "BELGIQUE", "ITALIE"];

const OuSeSitue = ({ MT, setMT }) => {
  // initialize country to what's in the global state otherwise France by default
  const initcountry = MT.ouSeSitue ? MT.ouSeSitue.country : "FRANCE";
  const initcity = MT.ouSeSitue ? MT.ouSeSitue.city : null;
  const [country, setCountry] = useState(initcountry);
  const [citySearch, setCitySearch] = useState(initcity);
  const [searchOpen, setSearchOpen] = useState(false);

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
              ouSeSitue: { country: event.target.value, city: citySearch }
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
                ouSeSitue: { country: country, city: null }
              });
            }}
          />
          {searchOpen && citySearch && (
            <CityList
              input={citySearch}
              click={cityAndCode => {
                return () => {
                  setCitySearch(cityAndCode);
                  setSearchOpen(false);
                  setMT({
                    ...MT,
                    ouSeSitue: { country: country, city: cityAndCode }
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
        next_allowed={MT.ouSeSitue && MT.ouSeSitue.country && MT.ouSeSitue.city}
        percent={60}
        // action={() => {
        //   setMT({ ...MT, ouSeSitue: { country: country, city: citySearch } });
        // }}
      />
    </div>
  );
};

export default OuSeSitue;
