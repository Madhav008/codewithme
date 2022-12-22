import React from 'react'
import QuestionPageRightSide from '../components/QuestionPageRightSide'
import QuestionTable from '../components/QuestionTable'
import SearchBar from '../components/SearchBar'

const QuestionsPage = () => {

    return (
        <div className='h-[100%]'>
            <div className="h-[10px] m-0 divider"></div>
            <div className='flex justify-between w-[100%] px-5'>
                <div className='w-[65%]'>
                    <div className="flex m-auto justify-between my-2">
                        <button className="btn btn-active btn-ghost btn-sm">All Problems</button>
                        <button className="btn btn-active btn-ghost btn-sm">Solved</button>
                        <button className="btn btn-active btn-ghost btn-sm">Unsolved</button>
                    </div>
                    <div className="h-[10px] m-0 divider"></div>
                    <SearchBar />
                    <div className="h-[10px] m-0 divider"></div>
                    <QuestionTable />
                    <div className="btn-group grid grid-cols-2 m-auto max-w-lg">
                        <button className="btn btn-outline">Previous page</button>
                        <button className="btn btn-outline">Next</button>
                    </div>
                </div>
                <div className='flex flex-col w-[30%] h-[100%]'>
                    <QuestionPageRightSide />
                </div>
            </div>

        </div>

    )
}

export default QuestionsPage