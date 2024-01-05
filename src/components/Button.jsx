import React from "react";
import "../styles.css";

function Button(props) {
  return (
    <div>
      <button className="button2" onClick={() => props.resetArray()}>
        Cancel
      </button>
      <button className="button" onClick={() => props.convertVideoHandler()}>
        Convert
      </button>
    </div>
  );
}
export default Button;
