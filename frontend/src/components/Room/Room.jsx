import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJoined, setRoomdata } from '../../store/joinedroomSlice';
import { fetchrooms, STATUSES } from '../../store/roomSlice';
import { Link } from 'react-router-dom';

const Room = () => {
    const dispatch = useDispatch();
    const { data: rooms, status } = useSelector((state) => state.room);
    const { joined } = useSelector((state) => state.joinedroom);

    useEffect(() => {
        dispatch(fetchrooms())
    }, [])


    function onJoinRoom(room) {
        dispatch(setRoomdata(room))
    }

if (STATUSES.LOADING == status) {
        return <h1>Loading</h1>
    }

    return (
        <>
            {rooms ? rooms.map((room, index) => (
                <div key={index} className="rounded bg-neutral text-neutral-content h-10 w-fit">
                    <div className="flex w-auto justify-center align-middle">
                        <h2 className="text-sm card-title mx-5 w-auto truncate">{room.roomname}</h2>
                        <Link to={`/room/${room.roomname}`}>
                            <button onClick={() => onJoinRoom(room)} className="btn-sm bg-primary hover:bg-primary-focus text-white font-bold px-4 rounded mt-1">Join</button>
                        </Link>
                    </div>
                </div>)) : null}

        </>

    )
}

export default Room