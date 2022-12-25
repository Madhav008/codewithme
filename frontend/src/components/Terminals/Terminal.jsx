import React from "react";
import "./terminal.css";
import { useSelector, useDispatch } from "react-redux";

const Terminal = ({ placeholder, output }) => {
  const { output: compiled_output } = useSelector((state) => state.usercode);

  // console.log(compiled_output);

  if (output.data!=null) {
    return (
      <>
        <textarea
          value={output.data ? output.data.stdout : null}
          disabled={true}
          placeholder={placeholder}
          className="terminal text-lg p-3"
        ></textarea>
      </>
    );
  }
  return (
    <>
      {compiled_output ? (
        <div className="terminal text-lg p-3 bg-black h-[50%]">
          <div>
            Status: <strong>{compiled_output.status} </strong>
          </div>
          <div>
            Passed TestCases: <strong>{compiled_output?.view_cases0}</strong>
          </div>
          <div>
            Total TestCases:{" "}
            <strong>{compiled_output?.total_test_cases}</strong>{" "}
          </div>
          <div>Error:{compiled_output?.message?.error}</div>
        </div>
      ) : null}
    </>
  );
};

export default Terminal;
