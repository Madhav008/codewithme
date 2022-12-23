import React from 'react'

const ChatComponent = ({leaveRoom,copyRoomId}) => {
    return (
        <div className='h-[90vh]'>
            <div class="w-full px-5 flex flex-col justify-between overflow-y-auto h-[90%]">
                {/* Header */}
                <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div class="relative flex items-center space-x-4">

                        <div class="flex flex-col leading-tight">
                            <div class="text-xs mt-1 flex items-center">
                                <span class="text-gray-700 mr-3">Anderson Vanhron</span>
                            </div>
                            <span class="text-xs text-gray-600">Junior Developer</span>
                        </div>
                        <button className=" text-xs bg-blue-500 hover:bg-blue-700 p-1 rounded-lg  text-cyan-50" onClick={leaveRoom}>
                            Leave
                        </button>
                        <button className=" text-xs bg-blue-900 hover:bg-blue-700 p-1 rounded-lg  text-cyan-50" onClick={copyRoomId}>
                            Invite
                        </button>
                    </div>

                </div>
                {/* Chat Messages */}
                <div class="flex flex-col mt-5">
                    <div class="flex justify-end mb-4">
                        <div
                            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Welcome to group everyone !
                        </div>
                        <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            class="object-cover h-8 w-8 rounded-full"
                            alt=""
                        />
                    </div>
                    <div class="flex justify-start mb-4">
                        <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            class="object-cover h-8 w-8 rounded-full"
                            alt=""
                        />
                        <div
                            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                            at praesentium, aut ullam delectus odio error sit rem. Architecto
                            nulla doloribus laborum illo rem enim dolor odio saepe,
                            consequatur quas?
                        </div>
                    </div>
                    <div class="flex justify-end mb-4">
                        <div>
                            <div
                                class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                            >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Magnam, repudiandae.
                            </div>

                            <div
                                class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Debitis, reiciendis!
                            </div>
                        </div>
                        <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            class="object-cover h-8 w-8 rounded-full"
                            alt=""
                        />
                    </div>
                   
                </div>
                {/* Send Messages Form */}
            </div>
            <div class="flex flex-row items-center  rounded-xl w-full px-4 h-[10%]">
                <div class="flex-grow ml-2 mr-2">
                    <div class="relative">
                        <div className='flex border rounded-xl   pl-4 h-10'>

                            <input type="text" class="focus:outline-none bg-transparent"></input>

                            <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 ">
                                <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
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