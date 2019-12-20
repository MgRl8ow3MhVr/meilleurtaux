import React, { useCallback } from "react";

const AdminOneItem = ({ name, randomSize }) => {
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
    >
      {name}
    </span>
  );
};

export default AdminOneItem;
