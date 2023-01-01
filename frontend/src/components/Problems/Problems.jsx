import React from 'react'
import './problem.css'
import { fetchproblemMetas, setPid, setproblemMeta } from '../../store/ProblemMetaSlice';
import { STATUSES } from '../../store/ProblemMetaSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { next, previous } from '../../store/joinedroomSlice';

const Problems = () => {
    const { data: questions, status:problem_status } = useSelector((state) => state.problemMeta)
    const { joined, roomdata, number ,status:joined_status} = useSelector((state) => state.joinedroom)
    const problems = roomdata.questions;
    const dispatch = useDispatch();
    const { pid } = useParams();

    
    useEffect(() => {
        if (joined ===false) {
            dispatch(setPid(pid))
            dispatch(fetchproblemMetas())
        }else{
            if(problems)
            dispatch(setproblemMeta(problems[number]))
        }
    }, [joined,problems])




    if (joined_status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }
    function nextQuestion() {
        console.log("NEXT")
        dispatch(next());
        dispatch(setproblemMeta(problems[number]))
    }

    function previousQuestion() {
        console.log("PRE")
        dispatch(previous());
        dispatch(setproblemMeta(problems[number]))
    }

    if (joined) {
        return (
            <>
                {problems ? <div className='problems p-3 overflow-y-scroll text-white h-[100%]'>
                    <div className='flex justify-between'>
                        <h1 className='text-lg font-bold pb-2'>{questions.title} :</h1>

                        <div className='w-max ml-auto flex gap-1'>
                            <button onClick={previousQuestion} className="btn btn-square btn-sm">
                                <MdArrowBackIos />
                            </button>
                            <button onClick={nextQuestion} className='btn btn-square btn-sm'>

                                <MdArrowForwardIos />
                            </button>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: questions.body }} />

                </div> : null}
            </>
        )
    }

    return (
        <div className='problems p-3 overflow-y-scroll text-white h-[100%]'>
            <h1 className='text-lg font-bold pb-2'>{questions.title} :</h1>
            <div dangerouslySetInnerHTML={{ __html: questions.body }} />
        </div>
    )

}

export default Problems