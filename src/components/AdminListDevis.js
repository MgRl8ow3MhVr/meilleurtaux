import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import trash from "../assets/trash.jpg";
import AdminOneItem from "./AdminOneItem";
import BackEndAddress from "./BackEndAddress";

const AdminListDevis = ({ token, unlog, ms }) => {
  const [data, setData] = useState([]);
  const [listendelete, setListendelete] = useState(false);

  const [reload, setReload] = useState(1);

  const colorGenerator = useCallback(() => {
    let col = "";
    for (let i = 0; i < 6; i++) {
      col += Math.floor(Math.random() * 16).toString(16);
    }
    return "#" + col;
  }, []);

  const devisdelete = useCallback(async id => {
    try {
      const response = await axios.post(BackEndAddress + "/deletedevis", {
        id: id
      });
      console.log(response.data);
      return "OK";
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReload(reload + 1);
    }, ms);
  }, [reload]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BackEndAddress + "/getdevis");
        setData(response.data.alldevis);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [listendelete]);

  return (
    <>
      {data && (
        <div
          style={{ backgroundColor: colorGenerator(), paddingBottom: "100px" }}
        >
          <h1> administration </h1>
          <h2> Avec Style Aleatoire </h2>
          <button
            style={{ border: "solid 2px", backgroundColor: "red" }}
            onClick={unlog}
          >
            CLICK TO LOG OUT
          </button>
          <div
            className="backofficebody"
            style={{ backgroundColor: colorGenerator() }}
          >
            <div>
              <AdminOneItem name="EMAIL" />
              <AdminOneItem name="ZIPCODE" />
              <AdminOneItem name="BIEN" />
              <AdminOneItem name="ETAT" />
            </div>
          </div>

          <div className="backofficebody">
            {data.map((devis, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: colorGenerator()
                  }}
                >
                  <AdminOneItem name={devis.email} randomSize={true} />
                  <AdminOneItem name={devis.zip} randomSize={true} />
                  <AdminOneItem name={devis.type} randomSize={true} />
                  <AdminOneItem name={devis.etat} randomSize={true} />

                  <img
                    src={trash}
                    alt="trash"
                    onClick={async () => {
                      const OK = await devisdelete(devis._id);
                      if (OK === "OK") {
                        setListendelete(!listendelete);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default AdminListDevis;
