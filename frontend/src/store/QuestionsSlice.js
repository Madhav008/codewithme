const { createSlice } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const questionSlice = createSlice({
    name: 'question',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        page:1,
        difficulty: 'Easy',
        query:''
    },
    reducers: {
        setquestions(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setDifficulty(state, action) {
            state.difficulty = action.payload;
        },
        setQuerys(state, action) {
            state.query = action.payload;
        },
        clearData(state, action) {
            state.data = [];
        }
    },

});

export const { setquestions, setStatus,setPage,setDifficulty,setQuerys,clearData } = questionSlice.actions;
export default questionSlice.reducer;

// Thunks
//Fetch questions by difficulty level
export function fetchquestions() {
    return async function fetchquestionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var pageno = getState().questions.page 
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/difficulty/Easy?page=${pageno}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            const data = await res.json();
            dispatch(setquestions(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

//Fetch Question by name
export function searchQuestions() {
    return async function fetchquestionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var pageno = getState().questions.page 
            var query = getState().questions.query;
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/search/${query}/?page=${pageno}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            const data = await res.json();
            // dispatch(clearData())
            dispatch(setquestions(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}