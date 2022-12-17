import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import {ACTIONS} from '../Action'
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import axios from 'axios';
import ChatComponent from '../components/ChatComponent';


const Home = ({ user }) => {
    const [output, setoutput] = useState({});
    const [code, setcode] = useState('');
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }
    const clients = [{ socketId: 1, username: "Madhav" }, { socketId: 2, username: "Raghav" },]

    function getCode(res) {
        setcode(res)
    }


    async function submitcode() {

        const options = {
            method: 'POST',
            url: `http://192.168.1.124:2358/submissions`,
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
            },
            data: { "language_id": "62", "source_code": code, "stdin": '' }
        };

        const response = await axios.request(options)

        fetchSubmission(response.data.token)

    }

    async function fetchSubmission(token) {
        const options = {
            method: 'GET',
            url: `http://192.168.1.124:2358/submissions/${token}`,
        };


        const res = await axios.request(options);

        if (res.data.status.id >= 3) {
            setoutput(res.data)
            console.log(res.data)
            return
        }
        console.log(res.data)
        setoutput(res.data)

        setTimeout(async () => {
            fetchSubmission(token)
        }, 1500);

    }


    useEffect(() => {
        if (user != null) {
            toast.success(`Hi ,Thank You For Login`);
        }
    }, [user])

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId:"roomId",
                username: "user.displayName",
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    // setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );

              // Listening for disconnected
              socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    // setClients((prev) => {
                    //     return prev.filter(
                    //         (client) => client.socketId !== socketId
                    //     );
                    // });
                }
            );
        };
        init();
    }, [])


    return (
        <div className="w-full flex min-h-[90%]">
            <div className=" mt-1 py-1 w-[20%] flex flex-col items-center justify-between">
                {/* <div>
                    <h3 className='font-semibold mb-7 '>Connected Users</h3>

                    <div className="px-1 mx-1 flex items-center gap-2 flex-wrap">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div> 
                <div>
                    <button className="btn bg-blue-500  text-white font-bold py-2 px-4 rounded w-full" onClick={copyRoomId}>
                        Copy ROOM ID
                    </button>
                    <button className="btn leaveBtn text-cyan-50" onClick={leaveRoom}>
                        Leave
                    </button>
                </div> */}

                <ChatComponent leaveRoom={leaveRoom} copyRoomId={copyRoomId} />

            </div>


            <main role="main" className=" h-min w-[60%]">
                <Editor submitcode={getCode} />
            </main>
            <div className=" w-[25%] ">
                <div className="h-max flex flex-col px-2 justify-between items-center">

                    <div className='flex flex-col items-center'>
                        <h3 className='font-semibold mb-7 '>Output </h3>
                        <div className="px-1 mx-1 flex items-center gap-2 flex-wrap">
                            Status :- {output.status ? (output.status.description) : ('')}
                        </div>
                        <div className="px-1 mx-1 flex items-center gap-2 flex-wrap">
                            Time Taken :- {output.time}
                        </div>
                        <div className="px-1 mx-1 flex items-center gap-2 flex-wrap">
                            Memory :- {output.memory}
                        </div>
                        <div className="px-1 mx-1 flex items-center gap-2 flex-wrap">
                            Result :- {output.compile_output ? (output.compile_output) : (output.stdout)}
                        </div>
                    </div>
                    <div className='flex mt-8'>
                        <button onClick={submitcode} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Home