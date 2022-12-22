import React from 'react'
import Avatar from 'react-avatar';

const Participants = () => {
    const clients = [{ socketId: 1, username: "Madhav Jindal" }, { socketId: 2, username: "Raghav" },]

    return (
        <>
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
           <li class="pb-3 sm:pb-4">
              <div class="flex items-center space-x-4">
                 <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/> */}
                    <Avatar className='text-center' name={clients[0].username} size={30} round="5px" />
                 </div>
                
                 <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $320
                 </div>
              </div>
           </li>
           
        </ul>
        
            {/* <div className='w-[40%] flex gap-2 justify-center overflow-auto rounded-lg '>
                <div className="flex items-center p-2 text-base font-bold rounded-lg bg-secondary-content">
                    <Avatar className='text-center' name={clients[0].username} size={30} round="5px" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-sm font-semibold">{clients[0].username}</span>
                </div>
            </div></> */}</>
    )
}

export default Participants