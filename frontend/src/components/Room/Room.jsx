import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchrooms, STATUSES } from '../../store/roomSlice';

const Room = () => {
    const dispatch = useDispatch();
    const { data: rooms, status } = useSelector((state) => state.room);

    useEffect(() => {

        dispatch(fetchrooms())
    }, [])

    if (STATUSES.LOADING == status) {
        return <h1>Loading</h1>
    }

    return (
        <>
            {rooms ? rooms.map((room, index) => (
                <div key={index} className="rounded bg-neutral text-neutral-content h-10">
                    <div className="flex w-auto justify-center align-middle">
                        <h2 className="text-sm card-title mx-5 w-auto truncate">{room.roomname}</h2>
                        <button className="btn-sm bg-primary hover:bg-primary-focus text-white font-bold px-4 rounded mt-1">Join</button>
                    </div>
                </div>)) : null}

        </>

    )
}

export default Room