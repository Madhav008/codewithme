import React from 'react'
import './terminal.css'
import {  STATUSES } from "../../store/ProblemMetaSlice";
import { useSelector, useDispatch } from "react-redux";

const InputTerminal = ({placeholder,getInput}) => {
  const { data: problem, status } = useSelector((state) => state.problemMeta);
  const dispatch = useDispatch();

  return (
        <textarea onChange={getInput} value={problem?problem.input:null} placeholder={placeholder} className="terminal text-lg p-3">
        </textarea>
  )
}

export default InputTerminal