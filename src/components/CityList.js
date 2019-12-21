import React, { useState, useEffect } from "react";
import axios from "axios";

const CityList = ({ input, click }) => {
  const [data, setData] = useState();

  //Fetching infos from Vipoco on component mounting, and reload if any new caracter is entered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://vicopo.selfbuild.fr/cherche/" + input
        );
        await setData(response.data.cities.slice(0, 15));
      } catch (e) {
        console.log(e.message);
        return;
      }
    };
    fetchData();
  }, [input]);

  return (
    <>
      {data && (
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
