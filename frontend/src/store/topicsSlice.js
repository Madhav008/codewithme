const { createSlice } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const topicSlice = createSlice({
    name: 'topic',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        settopic(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },

});

export const { settopic, setStatus } = topicSlice.actions;
export default topicSlice.reducer;

// Thunks
//Fetch topics by difficulty level
export function fetchtopic() {
    return async function fetchtopicThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch(`/problems/topics`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            const data = await res.json();
            dispatch(settopic(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
