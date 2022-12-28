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
        query:'',
        company:'',
        topic:''
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
        setCompany(state, action) {
            state.company = action.payload;
        },
        setTopic(state, action) {
            state.topic = action.payload;
        },
        clearData(state, action) {
            state.data = [];
        }
    },

});

export const { setquestions, setStatus,setPage,setDifficulty,setQuerys,setCompany,setTopic,clearData } = questionSlice.actions;
export default questionSlice.reducer;

// Thunks
//Fetch questions by difficulty level
export function fetchquestions() {
    return async function fetchquestionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var pageno = getState().questions.page 
            var difficulty = getState().questions.difficulty
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/difficulty/${difficulty}?page=${pageno}`, {
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

//Fetch Question by companyname
export function searchQuestionsbycompanyname() {
    return async function fetchquestionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var pageno = getState().questions.page 
            var query = getState().questions.company;
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/company/${query}/?page=${pageno}`, {
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


//Fetch Question by Topics
export function searchQuestionsbyTopics() {
    return async function fetchquestionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            var pageno = getState().questions.page 
            var query = getState().questions.topic;
            
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/topic/?page=${pageno}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:query})
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