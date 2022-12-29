import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { leaveTheRoom } from '../../store/joinedroomSlice'
import { useNavigate } from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import { sendMessage, setCurrentMessage } from '../../store/chatSlice';

const ChatComponent = ({socket}) => {
    
    const { roomdata, name } = useSelector((state) => state.joinedroom)
    const {user} = useSelector((state) => state.user)
    const { currentMessage, messages } = useSelector((state) => state.chat);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleMessageChange = (event) => {
        dispatch(setCurrentMessage(event.target.value));
    };

 
    const sendMsg = () => {
        if (currentMessage !== "") {
            const data = {
                room: name,
                author: user.username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            console.log(data);
            dispatch(sendMessage(data))
            socket.emit("send_message", data);
            dispatch(setCurrentMessage(""));
        }
    };


    return (

        <div className='h-[80vh]'>
            <div className="w-full px-5 flex flex-col justify-between overflow-y-auto  h-[90%]">
                {/* Header */}
                <div className="flex  py-3 border-b-2">
                    <div className=" flex items-center justify-between gap-2 m-auto">

                        <div className="badge badge-primary text-white">Invite</div>
                        <div onClick={() => { dispatch(leaveTheRoom()); navigate(`/`) }} className="badge badge-accent text-white">Leave</div>
                        <div className="badge badge-lg "> Joined {roomdata[0]?.users.length}</div>
                    </div>

                </div>
                {/* Chat Messages */}
                <ScrollToBottom>

                    {

                        messages[0] ? messages.map((data, index) => (
                            <div key={index}>
                                {
                                    data.author === user.username ? (
                                        <div className="chat chat-end">
                                            <div className="chat-bubble chat-bubble-primary opacity-[0.8]">{data.message}</div>
                                        </div>
                                    ) : (
                                        <div className="chat chat-start">
                                            <div className="chat-bubble chat-bubble-primary opacity-[0.8]">{data.message}</div>
                                        </div>
                                    )
                                }
                            </div>
                        )) : null
                    }
                </ScrollToBottom>

                {/* Send Messages Form */}
            </div>
            <div className="h-[10px] m-0 divider"></div>

            <div className="flex flex-row mt-2 rounded-xl w-full px-4 h-[10%]">
                <div className="flex-grow ml-2 mr-2">
                    <div className="relative">
                        <div className='flex border rounded-xl justify-between p-2 h-10'>

                            <input onKeyDown={(event) => {
                                event.key === "Enter" && sendMsg();
                            }} onChange={handleMessageChange} value={currentMessage} type="text" className="focus:outline-none bg-transparent w-[90%]"></input>

                            <button onClick={sendMsg} className="flex items-center justify-center h-full mx-3">
                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent