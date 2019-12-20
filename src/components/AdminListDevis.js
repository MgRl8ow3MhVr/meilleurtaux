import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import trash from "../assets/trash.jpg";
import AdminOneItem from "./AdminOneItem";
import BackEndAddress from "./BackEndAddress";
import BG from "../assets/BG.mp3";

const AdminListDevis = ({ token, unlog }) => {
  const [data, setData] = useState([]);
  const [listendelete, setListendelete] = useState(false);
  const [reload, setReload] = useState(1);
  const [speed, setSpeed] = useState(1);
  // const [speed, setSpeed] = useState(576);

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
    }, Number(1 / speed) * 576);
  }, [reload]);

  useEffect(() => {
    const audio = new Audio(BG);
    audio.play();
    audio.playbackRate = Number(speed);
    return () => {
      audio.pause();
    };
  }, [speed]);

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
          <div className="adminbar">
            <button
              onClick={() => {
                setSpeed(Number(speed) * 1.5);
              }}
            >
              <span>+</span>
            </button>
            <button onClick={unlog}>LOG OUT</button>
            <button
              onClick={() => {
                setSpeed(Number(speed) / 1.5);
              }}
            >
              <span>-</span>
            </button>
          </div>
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
