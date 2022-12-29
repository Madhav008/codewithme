import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editor from "../components/Editor";
import axios from "axios";
import Problems from "../components/Problems/Problems";
import Terminal from "../components/Terminals/Terminal";
import Runbar from "../components/Navbar/Runbar";
import ChatComponent from "../components/Chat/ChatComponent";
import AceEditors from "../components/Ace/AceEditor";
import InputTerminal from "../components/Terminals/InputTerminal";
import { useDispatch,useSelector } from 'react-redux'
import {submitProblem,setsubmitData} from '../store/ProblemMetaSlice';

const Home = () => {
  const [output, setoutput] = useState({});
  const [input, setinput] = useState("");
  const { data, status,submitData } = useSelector((state) => state.problemMeta)




  function getInput(e) {
    e.preventDefault();
    setinput(e.target.value);
  }

  const [hidden, sethidden] = useState(false);

  function openChatBox() {
    sethidden(!hidden);
  }

  return (
    <div>
      <Runbar chatbox={openChatBox} />
      <div className="flex h-[80vh]">
        <div className="w-[30%]  h-[82vh]">
          <Problems />
        </div>
        <main role="main" className="w-[60%] h-[82vh]">
          {/* <Editor submitcode={getCode} /> */}
          <AceEditors />
        </main>
        <div className="relative w-[25%] h-[82vh] ">
          <div
            className={
              hidden
                ? "hidden absolute h-[100%] w-[100%]"
                : "visible absolute h-[100%] w-[100%]"
            }
          >
            <div className="flex flex-col h-[100%]">
              <InputTerminal getInput={getInput} placeholder={"Input:"} />
              <Terminal output={output} placeholder={"Output:"} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
