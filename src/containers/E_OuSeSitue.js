import React, { useState } from "react";
import Navigation from "../components/Navigation";
import CityList from "../components/CityList";

const countries = ["FRANCE", "ALLEMAGNE", "BELGIQUE", "ITALIE"];

const OuSeSitue = ({ MT, setMT }) => {
  const [country, setCountry] = useState("TOGO");
  const [citySearch, setCitySearch] = useState();
  const [searchOpen, setSearchOpen] = useState(false);

  //https://vicopo.selfbuild.fr/cherche/680
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
        <select
          value={country}
          onChange={event => {
            setCountry(event.target.value);
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
        <div className="cityinput">
          <input
            type="text"
            value={citySearch}
            placeholder="ex:10300"
            onChange={event => {
              setSearchOpen(true);
              setCitySearch(event.target.value);
            }}
            onClick={() => setCitySearch("")}
          />
          {searchOpen && citySearch && (
            <CityList
              input={citySearch}
              click={input => {
                return () => {
                  setCitySearch(input);
                  setSearchOpen(false);
                };
              }}
            />
          )}
        </div>
      </div>

      {/* # # # # # # NAV BAR BOTTOM # # # # # # # # # # # # #  */}
      <Navigation
        prev="/situationActuelle"
        next="/ouSeSitue"
        next_allowed={country && citySearch}
        percent={60}
        action={() => {
          setMT({ ...MT, ouSeSitue: { country: country, city: citySearch } });
        }}
      />
    </div>
  );
};

export default OuSeSitue;
