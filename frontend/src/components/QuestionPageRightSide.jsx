import React from 'react'
import Room from '../components/Room'
import JoinModal from './JoinModal'

const QuestionPageRightSide = () => {
    return (
        <>
            <div className='flex justify-between w-[100%] m-auto max-w-[440px]'>
                <h2>Public Rooms
                </h2>
                <JoinModal/>
            </div>
            <div className='mt-5 grid grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto max-h-[220px]'>
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
            </div>
            <div className="h-[20px] m-0 divider"></div>
            <div className='flex justify-between w-[100%] m-auto max-w-[440px]'>
                <h2>Companies
                </h2>
            </div>
            <div className='p-2 mt-5 grid grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto max-h-[70%]'>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
                <div className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold w-max">Company A</div>
            </div>
        </>
    )
}

export default QuestionPageRightSide