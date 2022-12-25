import React ,{useEffect}from 'react'
import QuestionPageRightSide from '../components/QuestionPage/QuestionPageRightSide'
import QuestionTable from '../components/QuestionPage/QuestionTable'
import SearchBar from '../components/Search/SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../store/QuestionsSlice'
import { fetchquestions } from '../store/QuestionsSlice';
import {fetchcompany} from '../store/companiesSlice';
import { fetchtopic } from '../store/topicsSlice'

const QuestionsPage = () => {
    const { page } = useSelector((state) => state.questions)
    const dispatch = useDispatch();
    function nextPage() {
        dispatch(setPage(page + 1));
    }

    function previousPage() {
        if (page > 0) {
            dispatch(setPage(page - 1));
        }
    }

    useEffect(() => {
        dispatch(fetchquestions())
    }, [])

    useEffect(() => {
        dispatch(fetchcompany())
        dispatch(fetchtopic())
    },[])
    /* useEffect(() => {
        if (user != null) {
            toast.success(`Hi ,Thank You For Login`);
        }
    }, [user]) */

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
                        <button onClick={previousPage} className="btn btn-outline">Previous page</button>
                        <button onClick={nextPage} className="btn btn-outline">Next</button>
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