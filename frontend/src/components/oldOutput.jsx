import React from 'react'

const oldOutput = () => {
    return (
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
    )
}

export default oldOutput