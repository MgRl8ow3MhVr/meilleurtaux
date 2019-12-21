import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import trash from "../assets/trash.jpg";
import AdminOneItem from "./AdminOneItem";
import BackEndAddress from "./BackEndAddress";
import BG from "../assets/BG.mp3";

const AdminListDevis = ({ token, unlog }) => {
  // this state is to take fetched data from Backoffice
  const [data, setData] = useState([]);
  // this state is to force reloading this page and refetch data when we deleted one Devis
  const [listendelete, setListendelete] = useState(false);
  // state is to force reload the page and all colors with it on the Beat of the song
  const [reload, setReload] = useState(false);
  // This state will define speed of Song and of reload colors
  const [speed, setSpeed] = useState(1);

  // # # # # # # FUNCTIONS RELATED TO DISCO # # # # # # # # # # # #

  // This function Generated random Color.
  //In a Callback so it's not reloaded every render
  const colorGenerator = useCallback(() => {
    let col = "";
    for (let i = 0; i < 6; i++) {
      col += Math.floor(Math.random() * 16).toString(16);
    }
    return "#" + col;
  }, []);

  // UseEffect to force reload the page and all colors and elements transform styles with it on 104 BPM BeeGees Song
  useEffect(() => {
    setTimeout(() => {
      setReload(!reload);
    }, Number(1 / speed) * 576);
  }, [reload]);

  // UseEffect to play the song on Page Landing only.
  // Listening to Speed State to replay it with the new speed
  // Stops the Music on Component destrutction via return
  useEffect(() => {
    const audio = new Audio(BG);
    audio.play();
    if (speed > 0.3) {
      audio.playbackRate = speed;
    } else {
      audio.playbackRate = 0.3;
    }
    return () => {
      audio.pause();
    };
  }, [speed]);

  // # # # # # # FUNCTIONS RELATED BACK END CALLS # # # # # # # # # # # #

  // This function asks backOffice to delete a Devis
  //In a Callback so it's not reloaded every render
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

  // This function fetches the Devis Datas from Back End
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

  // # # # # # # # # # # # RENDERING # # # # # # # # # # # #

  return (
    <>
      {data && (
        <div
          style={{ backgroundColor: colorGenerator(), paddingBottom: "100px" }}
        >
          <h1> administration </h1>
          {/*   // # # # # # # # # # # # SPEED AND LOGOUT Buttons # # # # # # # # */}
          <div className="adminbar">
            <button
              onClick={() => {
                setSpeed(Number(speed) * 1.5);
              }}
              style={{
                transform: reload ? "scale(1.2)" : "scale(0.8)"
              }}
            >
              <span>+</span>
            </button>
            <button
              style={{
                transform: !reload ? "scale(1.2) rotate(5deg) " : "scale(0.8)"
              }}
              onClick={unlog}
            >
              LOG OUT
            </button>
            <button
              onClick={() => {
                setSpeed(Number(speed) / 1.5);
              }}
              style={{
                transform: reload ? "scale(1.2)" : "scale(0.8) "
              }}
            >
              <span>-</span>
            </button>
          </div>
          {/*   // # # # # # # # # # # # TITLES LINE # # # # # # # # */}

          <div
            className="backofficebody"
            style={{ backgroundColor: colorGenerator() }}
            style={{
              transform: !reload ? "rotate(0.5deg)" : "rotate(-0.5deg)"
            }}
          >
            <div>
              <AdminOneItem name="EMAIL" />
              <AdminOneItem name="ZIPCODE" />
              <AdminOneItem name="BIEN" />
              <AdminOneItem name="MONTANT" />
              <AdminOneItem name="POUBELLE" />
            </div>
          </div>
          {/*   // # # # # # # # # # # # ACTUAL DATA # # # # # # # # */}
          <div
            className="backofficebody"
            style={{
              transform: !reload ? "rotate(-0.2deg)" : "rotate(0.2deg)"
            }}
          >
            {data.map((devis, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: colorGenerator()
                  }}
                >
                  <AdminOneItem
                    name={devis.email}
                    randomSize={true}
                    devis={devis}
                  />
                  <AdminOneItem
                    name={devis.zip}
                    randomSize={true}
                    devis={devis}
                  />
                  <AdminOneItem
                    name={devis.type + " " + devis.etat}
                    randomSize={true}
                    devis={devis}
                  />
                  <AdminOneItem
                    name={devis.montant}
                    randomSize={true}
                    devis={devis}
                  />
                  {/* TRASH ICON TO DELETE A DEVIS */}
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
