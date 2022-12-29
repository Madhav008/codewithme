import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userdata: {}
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

