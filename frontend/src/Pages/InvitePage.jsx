import React from 'react'

const InvitePage = () => {
    return (
        <div className='w-[50%] m-auto mt-[150px] bg-indigo-100 rounded-lg h-[400px] flex flex-col'>
            <div className='flex flex-col m-auto w-[500px] justify-center' >
                <div className='pic'>

                </div>
                <div className='text-2xl xl:text-3xl font-extrabold'>
                    Paste invitation ROOM ID
                </div>

                <div>
                    <input type="text" id="first_name" className="mt-[20px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     " placeholder="ROOM ID" required>
                </input></div>
            
                <button type="submit" className="mx-auto mt-[20px] w-[90px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>

                <div className='mt-6 text-s text-gray-600 text-center'>
                    if you don't have an invite then create <span className='text-blue-700'>new room</span>
                </div>

            </div>




        </div>
    )
}

export default InvitePage