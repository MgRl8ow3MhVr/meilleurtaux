import React, { useEffect, useState } from "react";
import axios from "axios";

const colorGenerator = () => {
  let col = "";
  for (let i = 0; i < 6; i++) {
    col += Math.floor(Math.random() * 16).toString(16);
  }
  return "#" + col;
};

const sizeGenerator = () => {
  return 5 + Math.floor(Math.random() * 30);
};

console.log(colorGenerator());
const Admin = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/getdevis");
        setData(response.data.alldevis);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <>
          <h1> administration </h1>
          <h2> Avec Style Aleatoire </h2>
          <div className="backofficebody">
            {data.map((devis, index) => {
              return (
                <div
                  key={index}
                  style={{
                    color: colorGenerator(),
                    backgroundColor: colorGenerator()
                  }}
                >
                  <span
                    style={{
                      color: colorGenerator(),
                      backgroundColor: colorGenerator(),
                      fontSize: sizeGenerator()
                    }}
                  >
                    {devis.email}
                  </span>
                  <span
                    style={{
                      color: colorGenerator(),
                      backgroundColor: colorGenerator(),
                      fontSize: sizeGenerator()
                    }}
                  >
                    {devis.zip}
                  </span>
                  <span
                    style={{
                      color: colorGenerator(),
                      backgroundColor: colorGenerator(),
                      fontSize: sizeGenerator()
                    }}
                  >
                    {devis.type}
                  </span>
                  <span
                    style={{
                      color: colorGenerator(),
                      backgroundColor: colorGenerator(),
                      fontSize: sizeGenerator()
                    }}
                  >
                    {devis.etat}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Admin;
