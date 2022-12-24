const { createSlice } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const companySlice = createSlice({
    name: 'company',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setcompany(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },

});

export const { setcompany, setStatus } = companySlice.actions;
export default companySlice.reducer;

// Thunks
//Fetch companys by difficulty level
export function fetchcompany() {
    return async function fetchcompanyThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/problems/companies`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            const data = await res.json();
            dispatch(setcompany(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
