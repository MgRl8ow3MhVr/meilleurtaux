import React, { useState, useEffect } from "react";
import axios from "axios";

const CityList = ({ input, click }) => {
  const [data, setData] = useState();

  //Fetching infos from Vipoco on component mounting, and reload if any new caracter is entered
  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      try {
        const response = await axios(
          "https://vicopo.selfbuild.fr/cherche/" + input
        );

        //lets limit it to 20 first results
        await setData(response.data.cities.slice(0, 20));
      } catch (e) {
        console.log(e.message);
        return;
      }
    };
    fetchData();
  }, [input]);

  return (
    <>
      {!data ? (
        <div>Recherche en cours...</div>
      ) : (
        <div>
          {data.map((city, index) => {
            return (
              <div key={index} onClick={click(city.city, city.code)}>
                {city.city} ({city.code})
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CityList;
