import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Problems from "../components/Problems/Problems";
import Terminal from "../components/Terminals/Terminal";
import Runbar from "../components/Navbar/Runbar";
import AceEditors from "../components/Ace/AceEditor";
import InputTerminal from "../components/Terminals/InputTerminal";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRoomProblems, joinTheRoom, setJoined, setRoomName } from "../store/joinedroomSlice";
import { useParams } from 'react-router-dom';
import { setproblemMeta } from "../store/ProblemMetaSlice";
import ChatComponent from "../components/Chat/ChatComponent";
import io from "socket.io-client";
import { sendMessage } from "../store/chatSlice";
const socket = io.connect("localhost:5000");

const RoomPage = () => {
    const [output, setoutput] = useState({});
    const [input, setinput] = useState("");
    const { joined, roomdata, problems,name } = useSelector((state) => state.joinedroom)
    const dispatch = useDispatch()
    const joinChat = () => {
        if (name !== "") {
            socket.emit("join_room", name);
        }
    };
 

    function getInput(e) {
        e.preventDefault();
        setinput(e.target.value);
    }

    const [hidden, sethidden] = useState(true);

    function openChatBox() {
        sethidden(!hidden);
    }
    const { roomname } = useParams();

    useEffect(() => {
        joinChat()
        if (!joined) {
            dispatch(setRoomName(roomname))
            dispatch(joinTheRoom())
            dispatch(setJoined())
        }

    }, [])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            dispatch(sendMessage(data))
        })
    }, [socket])

    return (
        <div>
            <Runbar chatbox={openChatBox} />
            <div className="flex h-[80vh]">
                <div className="w-[30%]  h-[82vh]">
                    <Problems />
                </div>
                <main role="main" className="w-[60%] h-[82vh]">
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
                    <div
                        className={
                            hidden
                                ? "visible absolute h-[82vh] w-[100%]"
                                : "hidden absolute h-[82vh] w-[100%]"
                        }
                    >
                        <ChatComponent socket={socket}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomPage