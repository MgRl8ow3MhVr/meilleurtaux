import React from "react";

const EtVoila = ({ MT, setMT, finalId }) => {
  return (
    <div className="page">
      <div className="title">
        <h1>Et voilà, le formulaire est terminé</h1>
      </div>
      {finalId ? (
        <h2>Votre numéro de dossier est le {finalId}</h2>
      ) : (
        <h2>
          Traitement en cours. Patientez quelques secondes pour obtenir le
          numéro de dossier
        </h2>
      )}
    </div>
  );
};

export default EtVoila;
