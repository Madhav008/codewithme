import React from "react";
import "./terminal.css";

const Terminal = ({ placeholder, output }) => {
  return (
    <textarea
      value={output ? output.stdout : null}
      disabled={true}
      placeholder={placeholder}
      className="terminal text-lg p-3"
    ></textarea>
  );
};

export default Terminal;
