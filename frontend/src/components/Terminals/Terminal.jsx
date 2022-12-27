import React from "react";
import "./terminal.css";
import { useSelector, useDispatch } from "react-redux";

const Terminal = ({ placeholder, output }) => {
  const { output: compiled_output } = useSelector((state) => state.usercode);
  const { data: expected_output } = useSelector((state) => state.expectedcode);

  // console.log(compiled_output);

  if (output.data != null) {
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

  // ?.message?.error
  if (compiled_output?.message?.error != null) {
    return (<>


      <div className="bg-red-900 bg-opacity-50 h-[50%] ">
        <h1 className="text-red-500 font-semibold text-2xl">Compilation Error:-</h1>
        <div>
          <p className="text-red-700">
            {compiled_output?.message?.error}
          </p>
        </div>
      </div>

    </>)
  }

  if (compiled_output?.status == "QUEUED") {
    return (<>
      <div className="h-[50%] bg-black">
        <h1 className="font-bold text-xl"> Request Queued</h1>
        <h2 className="font-semibold text-primary-focus text-lg"> Evaluating </h2>
      </div>

    </>)
  }


  if (compiled_output?.status == "SUCCESS") {
    return (<>
      <div className="h-[50%] bg-black">
        <div className="m-2">
          <h1 className="font-bold text-xl"> For Input</h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.input} </h2>

          <h1 className="font-bold text-xl">Your Output: </h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.output}  </h2>

          <h1 className="font-bold text-xl">Expected Output: </h1>
          <h2 className=" text-primary-focus text-lg"> {expected_output?.message?.output} </h2>

        </div>
      </div>

    </>)
  }
  if (compiled_output?.status == "calculated" && compiled_output?.view_mode == "wrong_p") {
    return (<>
      <div className="bg-red-900 bg-opacity-50 h-[50%] overflow-auto">
        <div className="m-2">
          <h1 className="text-red-500 font-semibold text-2xl"> Wrong Output: </h1>

          <h1 className="font-bold text-xl">Test Cases Passed: </h1>
          <h2 className=" text-primary-focus text-lg">{compiled_output?.test_cases_processed}/{compiled_output?.total_test_cases} </h2>

          <h1 className="font-bold text-xl"> For Input</h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.file_input} </h2>

          <h1 className="font-bold text-xl">Your Output: </h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.code_output}  </h2>

          <h1 className="font-bold text-xl">Expected Output: </h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.file_output} </h2>


        </div>
      </div>

    </>)
  }
  if (compiled_output?.status == "calculated") {
    return (<>
      <div className="h-[50%] bg-black">
        <div className="m-2">
          <h1 className="font-bold text-2xl text-green-600">ACCEPTED</h1>
          <h1 className="font-bold text-xl"> Test Cases Passed: </h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.total_test_cases} / {compiled_output?.test_cases_processed} </h2>

          <h1 className="font-bold text-xl">Total Time Taken: </h1>
          <h2 className=" text-primary-focus text-lg"> {compiled_output?.message?.execution_time}  </h2>
        </div>
      </div>

    </>)
  }


};

export default Terminal;
