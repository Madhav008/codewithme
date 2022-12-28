import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchquestions, setDifficulty } from '../../store/QuestionsSlice'
import ProblemRows from '../Problems/ProblemRows'
import './questionTable.css'


const QuestionTable = () => {
    const dispatch = useDispatch();
    const [value, setvalue] = useState()
    function getValue(event) {
        console.log(event.target.value);
        setvalue(event.target.value)
        if (event.target.value === "EASY")
            dispatch(setDifficulty("Easy"))        
        if (event.target.value === "MEDIUM")
            dispatch(setDifficulty("Medium"))        
        if (event.target.value === "HARD")
            dispatch(setDifficulty("Hard")) 
        
        dispatch(fetchquestions())
    }

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
                                <select value={value} onChange={getValue} className="select select-bordered select-sm max-w-xs">
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


