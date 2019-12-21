import React, { useCallback } from "react";

const AdminOneItem = ({ name, randomSize, devis }) => {
  const sizeGenerator = useCallback(() => {
    return 5 + Math.floor(Math.random() * 30);
  }, []);
  const colorGenerator = useCallback(() => {
    let col = "";
    for (let i = 0; i < 6; i++) {
      col += Math.floor(Math.random() * 16).toString(16);
    }
    return "#" + col;
  }, []);

  return (
    <span
      style={{
        backgroundColor: colorGenerator(),
        color: colorGenerator(),
        fontSize: randomSize ? sizeGenerator() : 15
      }}
      onClick={() => {
        devis &&
          alert(
            `ID: ${devis._id} \n email: ${devis.email} \n type: ${devis.type} \n etat: ${devis.etat} \n situation: ${devis.situation} \n ZIP: ${devis.zip} \n montant+travaux: ${devis.montant}`
          );
      }}
    >
      {name}
    </span>
  );
};

export default AdminOneItem;
