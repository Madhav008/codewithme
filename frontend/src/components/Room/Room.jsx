import React from 'react'

const Room = () => {
    return (
        <div className="rounded m-auto bg-neutral text-neutral-content h-10">
            <div className="flex">
                <h2 className="text-sm card-title mx-5">RommName!</h2>
                <button className="  bg-primary hover:bg-primary-focus text-white font-bold py-2 px-4 rounded">Join</button>
            </div>
        </div>
    )
}

export default Room