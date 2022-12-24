import React from 'react'
import ProblemRows from './ProblemRows'
import './questionTable.css'

const QuestionTable = () => {
    
    return (
        <div className="questionTable">
            <div className="relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th></th>
                            <th scope="col" className="py-3 px-6">
                                Problems
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <select className="select select-bordered select-sm max-w-xs">
                                    <option disabled selected>DIFFICULTY</option>
                                    <option>EASY</option>
                                    <option>MEDIUM</option>
                                    <option>HARD</option>
                                </select></th>


                        </tr>
                    </thead>
                    <tbody>
                        <ProblemRows />

                    </tbody>
                </table>

            </div>
            
        </div>
    )
}

export default QuestionTable


