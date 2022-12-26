import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchrooms } from '../../store/roomSlice';

const Room = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(fetchrooms())
    }, [])
    
    return (
        <div className="rounded bg-neutral text-neutral-content h-10">
            <div className="flex w-auto justify-center align-middle">
                <h2 className="text-sm card-title mx-5 w-auto truncate">RommName !</h2>
                <button className="btn-sm bg-primary hover:bg-primary-focus text-white font-bold px-4 rounded mt-1">Join</button>
            </div>
        </div>
    )
}

export default Room