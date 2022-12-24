import React from 'react'
import './problem.css'
import { fetchproblemMetas, setPid } from '../store/ProblemMetaSlice';
import {STATUSES} from '../store/ProblemMetaSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Problems = () => {
    const { data: questions, status } = useSelector((state) => state.problemMeta)
    const dispatch = useDispatch();
    const { pid } = useParams();

    useEffect(() => {
      dispatch(setPid(pid))
      dispatch(fetchproblemMetas())
      
    }, [])
    
    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    return (
        <div className='problems p-3 overflow-y-scroll text-white h-[100%]'>
            <h1 className='text-lg font-bold pb-2'>{questions.title} :</h1>
           <div dangerouslySetInnerHTML={{ __html: questions.body }} />
        </div>
    )
}

export default Problems