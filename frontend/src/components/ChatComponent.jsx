import React from 'react'

const ChatComponent = ({ leaveRoom, copyRoomId }) => {
    return (
        <div className='h-[80vh]'>
            <div class="w-full px-5 flex flex-col justify-between overflow-y-auto  h-[90%]">
                {/* Header */}
                <div class="flex  py-3 border-b-2">
                    <div class=" flex items-center justify-between gap-2 m-auto">

                        <div className="badge badge-primary text-white">Invite</div>
                        <div className="badge badge-accent text-white">Leave</div>
                        <div className="badge badge-lg "> Joined 9</div>
                    </div>

                </div>
                {/* Chat Messages */}
                <div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-primary opacity-[0.8]">What kind of nonsense is this</div>
                    </div>


                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-info opacity-[0.8]">Calm down, Anakin.</div>
                    </div>

                </div>


                {/* Send Messages Form */}
            </div>
            <div className="h-[10px] m-0 divider"></div>

            <div class="flex flex-row mt-2 rounded-xl w-full px-4 h-[10%]">
                <div class="flex-grow ml-2 mr-2">
                    <div class="relative">
                        <div className='flex border rounded-xl justify-between p-2 h-10'>

                            <input type="text" class="focus:outline-none bg-transparent w-[90%]"></input>

                            <button class="flex items-center justify-center h-full mx-3">
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