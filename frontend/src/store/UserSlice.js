import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
};

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserdata: (state, actions) => {
            state.user = actions.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    }
});

export const { setUserdata, setStatus } = userSlice.actions;

export default userSlice.reducer;


// Thunks
export function fetchUser() {
    return async function fetchUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch(`/auth/login/success`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })

            

            const user = await res.json();

            console.log(user.user)
            dispatch(setUserdata(user.user))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

