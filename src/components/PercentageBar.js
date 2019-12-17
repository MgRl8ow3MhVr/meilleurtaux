import React from "react";

const PercentageBar = ({ percent }) => {
  const style1 = {
    backgroundColor: "#FFDFB1",
    width: `${percent}%`,
    height: "5px"
  };
  const style2 = {
    backgroundColor: "#F0F0F0",
    width: `${100 - percent}%`,
    height: "5px"
  };
  const styleNumber = {
    left: `${percent}%`
  };

  return (
    <div className="percentagebar">
      <div style={style1}></div>
      <div style={styleNumber} className="number">
        {percent + " %"}
      </div>
      <div style={style2}></div>
    </div>
  );
};

export default PercentageBar;
