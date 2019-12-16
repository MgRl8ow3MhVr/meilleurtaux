import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navigation = ({ prevNext, setnext }) => {
  const history = useHistory();

  return (
    <div className="navigation">
      <button
        onClick={() => {
          setnext(-1);
          history.push(prevNext[0]);
        }}
      >
        PRECEDENT
      </button>

      <button
        onClick={() => {
          setnext(1);
          history.push(prevNext[1]);
        }}
      >
        SUIVANT
      </button>
    </div>
  );
};

export default Navigation;
