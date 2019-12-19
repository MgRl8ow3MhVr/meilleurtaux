import React from "react";

const EtVoila = ({ MT, setMT, finalId }) => {
  return (
    <div className="page">
      <div className="title">
        <h1>Et voilà, le formulaire est terminé</h1>
      </div>
      <h2>Votre numéro de dossier est le {finalId}</h2>
    </div>
  );
};

export default EtVoila;
