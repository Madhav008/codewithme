import React, { useEffect, useState } from 'react'
import Multiselect from '../MultiSelectComp/Multiselect'
import { useDispatch, useSelector } from "react-redux";
import { fetchcompany } from '../../store/companiesSlice';
import { fetchtopic } from '../../store/topicsSlice'
import {  createroom, createRoomName, setCreaateRoom } from '../../store/roomSlice';
import { setJoined } from '../../store/joinedroomSlice';
import { useNavigate } from 'react-router-dom';

const JoinModal = () => {

    const { data: company } = useSelector((state) => state.companies);
    const { data: topic } = useSelector((state) => state.topics);
    const { roomname } = useSelector((state) => state.room);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchcompany())
        dispatch(fetchtopic())
    }, [])



    const [min, setmin] = useState(0)
    function setValue() {

        if (min < 105) {
            setmin(min + 15);
        }
    }

    function decValue() {
        if (min > 15) {
            setmin(min - 15);
        }
    }
    const [selectedCompany, setSelectedCompany] = useState("Select");
    const [selectedTopic, setSelectedTopic] = useState("Select");

    function slectCompany(item) {
        setSelectedCompany(item);
    }

    function selectTopic(item) {
        setSelectedTopic(item);
    }

    function create() {

        dispatch(setCreaateRoom({
            userid: "Madhav",
            topic: selectedTopic,
            company: selectedCompany,

        }));

        dispatch(setJoined());
        dispatch(createroom());
        navigate(`/room/${roomname}`)

    }

    return (
        <div className='mr-2'>{/* The button to open modal */}
            <label htmlFor="my-modal-6" className="btn btn-sm " onClick={()=>{dispatch(createRoomName())}}>Create Room</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create The Room</h3>



                    <div className="form-control w-full">
                        <p>Select The Companies</p>
                        <Multiselect items={company ? company[0]?.Companies : null} select={slectCompany} value={selectedCompany} />
                    </div>
                    <div >
                        <p>Select the Topics</p>
                        <Multiselect items={topic ? topic[0]?.Topics : null} select={selectTopic} value={selectedTopic} />
                    </div>
                    <div >
                        <p>Select the Difficulty</p>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Easy</span>
                                <input type="checkbox" className="checkbox checkbox-info" />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">Medium</span>
                                <input type="checkbox" className="checkbox checkbox-info" />
                            </label><label className="cursor-pointer label">
                                <span className="label-text">Hard</span>
                                <input type="checkbox" className="checkbox checkbox-info" />
                            </label>
                        </div>
                    </div>


                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-2 ">
                        <p>Select the time</p>
                        <div className="flex gap-1">
                            <span className="countdown font-mono text-2xl">
                                <span style={{ "--value": (min < 0) ? 0 : (min > 99) ? 99 : min }}></span>
                            </span>
                            min
                        </div>

                    </div>

                    <div >

                        <div className='flex w-full m-auto'>
                            <button onClick={decValue} className="ml-2 text-xl font-bold btn-lg bg-slate-800 rounded-lg">
                                -
                            </button>
                            <button onClick={setValue} className="ml-1 text-xl font-bold btn-lg bg-slate-800 rounded-lg">
                                +
                            </button>

                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="modal-action" >
                            <label htmlFor="my-modal-6" className="btn">Close!</label>
                        </div>
                        <div className="modal-action" onClick={create}>
                            <label htmlFor="my-modal-6" className="btn">Create!</label>
                        </div>
                    </div>

                </div>
            </div></div>
    )
}

export default JoinModal